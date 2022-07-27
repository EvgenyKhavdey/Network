package ru.khavdey.network.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.khavdey.network.domain.User;


public interface UserDetailRepo extends JpaRepository<User, String> {
}
