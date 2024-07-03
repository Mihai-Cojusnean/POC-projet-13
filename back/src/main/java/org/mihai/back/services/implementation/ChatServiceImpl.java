package org.mihai.back.services.implementation;

import lombok.RequiredArgsConstructor;
import org.mihai.back.models.ChatMessage;
import org.mihai.back.repositories.ChatMessageRepository;
import org.mihai.back.services.ChatService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatMessageRepository chatMessageRepo;

    public List<ChatMessage> getMessages(String senderId, String receiverId) {
        return chatMessageRepo.findMessagesBetweenUsers(senderId, receiverId);
    }

    public void save(ChatMessage message) {
        message.setTimestamp(LocalDateTime.now());
        if (message.getSenderId().equals("1") || message.getReceiverId().equals("1")) {
            message.setChat_id(1);
        } else message.setChat_id(2);
        chatMessageRepo.save(message);
    }
}
