package com.springboot.domain.posts.repository.search;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.JPQLQuery;
import com.springboot.domain.category.model.entity.QCategory;
import com.springboot.domain.member.model.QMember;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.model.entity.QPosts;
import com.springboot.domain.reply.model.entity.QReply;
import com.springboot.domain.topic.model.entity.QTopic;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

@Log4j2
public class SearchBoardRepositoryImpl extends QuerydslRepositorySupport implements
    SearchBoardRepository {

    public SearchBoardRepositoryImpl() {
        super(Posts.class);
    }

//    @Override
//    public Posts search1() {
//
//        log.info("search1........................");
//
//        QPosts posts = QPosts.posts;
//        QReply reply = QReply.reply;
//        QMember member = QMember.member;
//
//        JPQLQuery<Posts> jpqlQuery = from(posts);
//        jpqlQuery.leftJoin(member).on(posts.author.eq(member));
//        jpqlQuery.leftJoin(reply).on(reply.posts.eq(posts));
//
//        JPQLQuery<Tuple> tuple = jpqlQuery.select(posts, member.id, member.email, member.nickname);
//        tuple.groupBy(posts);
//
//        log.info("---------------------------");
//        log.info(tuple);
//        log.info("---------------------------");
//
//        List<Tuple> result = tuple.fetch();
//
//        log.info(result);
//
//        return null;
//    }

    @Override
    public Page<Object[]> searchPage(String type, String keyword, Pageable pageable) {

        log.info("searchPage.............................");

        QPosts posts = QPosts.posts;
//        QReply reply = QReply.reply;
        QMember member = QMember.member;
        QTopic topic = QTopic.topic;
        QCategory category = QCategory.category;

        JPQLQuery<Posts> jpqlQuery = from(posts);
        jpqlQuery.leftJoin(member).on(posts.author.eq(member));
//        jpqlQuery.leftJoin(reply).on(reply.posts.eq(posts));
//        jpqlQuery.innerJoin(category).on(posts.id.eq(category.posts.id));
        jpqlQuery.innerJoin(category).on(posts.eq(category.posts));
        jpqlQuery.innerJoin(topic).on(category.topic.eq(topic));
//        jpqlQuery.innerJoin(topic).on(category.topic.id.eq(topic.id));

        JPQLQuery<Tuple> tuple = jpqlQuery.select(posts, member);
//        JPQLQuery<Tuple> tuple = jpqlQuery.select(posts, member, topic);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        BooleanExpression expression = posts.id.gt(0L);

        booleanBuilder.and(expression);

        if (type != null) {
            String[] typeArr = type.split("");
            //검색 조건을 작성하기
            BooleanBuilder conditionBuilder = new BooleanBuilder();

            for (String t : typeArr) {
                switch (t) {
                    case "t":
                        conditionBuilder.or(topic.name.contains(keyword));
                        break;
                    case "a":
                        conditionBuilder.or(member.nickname.contains(keyword));
                        break;
                    case "c":
                        conditionBuilder.or(posts.content.contains(keyword));
                        break;
                }
            }
            booleanBuilder.and(conditionBuilder);
        }

        tuple.where(booleanBuilder);

        //order by
        Sort sort = pageable.getSort();

        //tuple.orderBy(board.bno.desc());

        sort.stream().forEach(order -> {
            Order direction = order.isAscending() ? Order.ASC : Order.DESC;
            String prop = order.getProperty();

            PathBuilder orderByExpression = new PathBuilder(Posts.class, "posts");
            tuple.orderBy(new OrderSpecifier(direction, orderByExpression.get(prop)));

        });
        tuple.groupBy(posts);

        //page 처리
        tuple.offset(pageable.getOffset());
        tuple.limit(pageable.getPageSize());

        List<Tuple> result = tuple.fetch();

        log.info(result);

        long count = tuple.fetchCount();

        log.info("COUNT: " + count);

        return new PageImpl<Object[]>(
            result.stream().map(t -> t.toArray()).collect(Collectors.toList()),
            pageable,
            count);
    }
}
