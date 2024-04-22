package com.example.testeditions.Controllers;

import com.example.testeditions.DTO.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/{roomId}")
    public void chat(@DestinationVariable String roomId, ChatMessage message) throws IOException {
        if (message.getFile() != null) {
            // Handle file content
            // You can save the file to disk or handle it as needed
            byte[] fileContent = message.getFile().getBytes();
            String fileType = message.getFile().getContentType();
            message.setFileContent(fileContent);
            message.setFileType(fileType);
        }
        messagingTemplate.convertAndSend("/topic/" + roomId, message);
    }


}
