package org.mihai.back.services;

import org.mihai.back.models.ChatMessage;

import java.util.List;

public interface ChatService {

    /**
     * Retrieves a list of chat messages between two users.
     *
     * @param user1Id The unique identifier of the first user.
     * @param user2Id The unique identifier of the second user.
     * @return a list of {@link ChatMessage} objects containing the conversation history,
     * @throws IllegalArgumentException if either `senderId` or `receiverId` is null or empty.
     */
    List<ChatMessage> getMessages(String user1Id, String user2Id);

    /**
     * Saves the provided {@link ChatMessage} object.
     *
     * This method save new chat messages.
     * @param message The {@link ChatMessage} object to be saved.
     */
    void save(ChatMessage message);
}
