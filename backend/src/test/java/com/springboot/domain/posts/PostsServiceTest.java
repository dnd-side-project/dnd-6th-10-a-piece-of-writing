//package com.springboot.domain.posts;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//import com.springboot.domain.member.model.Member;
//import com.springboot.domain.member.repository.MemberRepository;
//import com.springboot.domain.posts.model.dto.MultipartDto;
//import com.springboot.domain.posts.model.dto.PageRequestDto;
//import com.springboot.domain.posts.model.dto.PageResultDto;
//import com.springboot.domain.posts.model.dto.PostsDto;
//import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
//import com.springboot.domain.posts.model.dto.PostsSaveResponseDto;
//import com.springboot.domain.posts.model.entity.Posts;
//import com.springboot.domain.posts.repository.PostsRepository;
//import com.springboot.domain.posts.service.PostsService;
//import com.springboot.domain.reply.model.dto.ReplyDto;
//import com.springboot.domain.reply.model.entity.Reply;
//import com.springboot.domain.reply.repository.ReplyRepository;
//import com.springboot.domain.reply.service.ReplyService;
//import java.awt.image.BufferedImage;
//import java.io.ByteArrayOutputStream;
//import java.io.File;
//import java.io.IOException;
//import java.net.MalformedURLException;
//import java.net.URL;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.IntStream;
//import javax.imageio.ImageIO;
//import javax.transaction.Transactional;
//import net.bytebuddy.utility.RandomString;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.web.multipart.MultipartFile;
//
//@ExtendWith(SpringExtension.class)
//@SpringBootTest
//public class PostsServiceTest {
//
//    @Autowired
//    private PostsService service;
//
//    @Autowired
//    private ReplyService replyService;
//
//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Autowired
//    private PostsRepository postsRepository;
//
//    @Autowired
//    private ReplyRepository replyRepository;
//
//    Logger logger = LoggerFactory.getLogger(PostsServiceTest.class);
//
//    @DisplayName("[Service] 게시물 대량 삽입 테스트 ")
//    @Test
//    @Transactional
//    public void testPostsSave() {
//
//        IntStream.rangeClosed(1, 10).forEach(i -> {
//
//            String content = "test posts content " + i;
//            String ref = "test posts reference " + i;
//
//            Member author = memberRepository.findAll().get(0);
//            Long authorId = author.getId();
//
//            List<Long> topicIdList = new ArrayList<>();
//
//            int num = (int) ((Math.random() * 9) + 1);
//
//            for (int j = 0; j < num; j++) {
//                topicIdList.add((long) ((Math.random() * 9) + 1));
//            }
//
//            PostsSaveRequestDto requestDto = PostsSaveRequestDto.builder()
//                .content(content)
//                .ref(ref)
//                .authorId(authorId)
//                .topicIdList(topicIdList)
//                .build();
//
//            logger.info("requestDTO : " + requestDto);
//
//            // image url to multipartfile
//
//            URL imageUrl = null;
//            try {
//                imageUrl = new URL("https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ");
//
//            BufferedImage image = ImageIO.read(imageUrl);
//
//            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//
//            ImageIO.write(image,"jpg",byteArrayOutputStream);
//
//            byteArrayOutputStream.flush();
//
//            String fileName = RandomString.make() + new Date().getTime() + ".jpg";
//
//            MultipartFile multipartFile = new MockMultipartFile(fileName,fileName,MediaType.IMAGE_JPEG_VALUE,byteArrayOutputStream.toByteArray());
//
//            byteArrayOutputStream.close();
//
//            MultipartDto multipartDto = MultipartDto.builder()
//                .file(multipartFile)
//                .build();
//
//            PostsSaveResponseDto responseDto = service.register(requestDto, multipartDto);
//
//            logger.info("responseDto : " + responseDto.toString());
//
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//
////            MockMultipartFile mockImage = new MockMultipartFile("test1", "test1.png",
////                MediaType.IMAGE_PNG_VALUE, "test1".getBytes());
//
////            MultipartDto multipartDto = MultipartDto.builder()
////                .file(mockImage)
////                .build();
//
////            PostsSaveResponseDto responseDto = service.register(requestDto, multipartDto);
//
////            logger.info("responseDto : " + responseDto.toString());
//        });
//    }
//
////    @DisplayName("[Service] 조건부 목록 조회 페이지네이션 search 테스트 ")
////    @Test
////    @Transactional
////    public void testSearch() {
////
////        Long loginUserId = memberRepository.findAll().get(0).getId();
////
////        PageRequestDto pageRequestDTO = new PageRequestDto();
////        pageRequestDTO.setPage(1);
////        pageRequestDTO.setSize(10);
////        pageRequestDTO.setType("i");
////        pageRequestDTO.setKeyword("12");
////        pageRequestDTO.setTopicId(1L);
////
////        PageResultDto<PostsDto, Object[]> result = service.getList(pageRequestDTO,loginUserId);
////
////        for (PostsDto postsDto : result.getDtoList()) {
////            logger.info(postsDto.toString());
////        }
////    }
//
//    @DisplayName("[Service] 전체 목록 조회 페이지네이션 search 테스트 ")
//    @Test
//    @Transactional
//    public void testSelectAllList() {
//
//        Long loginUserId = memberRepository.findAll().get(0).getId();
//
//        PageRequestDto pageRequestDTO = new PageRequestDto();
//        pageRequestDTO.setPage(1);
//        pageRequestDTO.setSize(10);
//
//        PageResultDto<PostsDto, Object[]> result = service.getList(pageRequestDTO, loginUserId);
//
//        for (PostsDto postsDto : result.getDtoList()) {
//            logger.info(postsDto.toString());
//        }
//    }
//
//}
