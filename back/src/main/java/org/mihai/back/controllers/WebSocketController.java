package org.mihai.back.controllers;

import lombok.RequiredArgsConstructor;
import org.mihai.back.models.ChatMessage;
import org.mihai.back.services.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
@CrossOrigin
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    @MessageMapping("/message/{receiverId}")
    public void sendMessage(@DestinationVariable String receiverId, ChatMessage message) {
        chatService.save(message);
        messagingTemplate.convertAndSendToUser(receiverId, "/topic/message", message);
    }

    @GetMapping("/api/messages/{user1}/{user2}")
    public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable String user1, @PathVariable String user2) {
        List<ChatMessage> messages = chatService.getMessages(user1, user2);
        return ResponseEntity.ok(messages);
    }
}
