package com.example.testeditions.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
public class ChatMessage {

    String message;
    String user;
    private MultipartFile file;
    private byte[] fileContent; // For storing file content
    private String fileType;
}
