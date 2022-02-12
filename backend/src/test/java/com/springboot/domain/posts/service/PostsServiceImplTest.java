package com.springboot.domain.posts.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class PostsServiceImplTest {

    @Autowired
    private PostsService postsService;
    private MultipartFile multipartFile;

    @BeforeEach
    public void setup() throws IOException {
        multipartFile = new MockMultipartFile("javaTest.png",
                new FileInputStream(new File(
                        "./src/test/java/com/springboot/domain/posts/service/javaTest.png")));
    }

    @DisplayName("사진 업로드 서비스 코드 테스트")
    @Test
    void postsImgUpload() throws Exception {
        String url = postsService.postsImgUpload(multipartFile, "javaTest");
        assertThat(url).isEqualTo("https://storage.googleapis.com/example-ocr-test/javaTest");
    }

    @DisplayName("사진 텍스트 추출 코드 테스트")
    @Test
    void postsImgExtractWords() throws Exception {
        String result = postsService.postsImgExtractWords(multipartFile, "javaTest");
        assertThat(result).isEqualTo("Test\n");
    }

}