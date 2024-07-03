package org.mihai.back.repositories;

import org.mihai.back.models.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {

    @Query("SELECT m FROM ChatMessage m " +
            "WHERE (m.senderId = :user1 AND m.receiverId = :user2) " +
            "OR (m.senderId = :user2 AND m.receiverId = :user1)")
    List<ChatMessage> findMessagesBetweenUsers(@Param("user1") String user1, @Param("user2") String user2);
}
