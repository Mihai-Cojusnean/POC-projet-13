package org.mihai.back.controllers;

import lombok.RequiredArgsConstructor;
import org.mihai.back.models.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/messages")
    public void sendMessage(ChatMessage message) {
        if (message.getReceiverId() == null) {
            messagingTemplate.convertAndSendToUser("admin", "/topic/messages", message);
        } else messagingTemplate.convertAndSendToUser(message.getReceiverId(), "/topic/messages", message);
    }

    @MessageMapping("/user.addUser")
    public void sendAddUser(ChatMessage message) {
        System.out.println(message);
    }
}
