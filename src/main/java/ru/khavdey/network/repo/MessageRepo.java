package ru.khavdey.network.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.khavdey.network.domain.Message;

public interface MessageRepo extends JpaRepository<Message, Long> {
}
