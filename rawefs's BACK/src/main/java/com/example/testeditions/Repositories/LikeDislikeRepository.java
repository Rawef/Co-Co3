package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.LikeDislike;
import com.example.testeditions.Entites.Profil;
import com.example.testeditions.Entites.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeDislikeRepository extends JpaRepository<LikeDislike,Long> {
    LikeDislike findByProfilAndUser(Profil profil, User user);
}
