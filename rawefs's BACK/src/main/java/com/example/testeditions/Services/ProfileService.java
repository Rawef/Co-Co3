package com.example.testeditions.Services;


import com.example.testeditions.Entites.Matchs;
import com.example.testeditions.Entites.Profil;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.MatchRepository;
import com.example.testeditions.Repositories.ProfilRepository;
import com.example.testeditions.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProfileService implements IProfileService {

    @Autowired
    private ProfilRepository profileRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MatchRepository matchsRepository;


    @Override
    public Profil createProfile(Profil profile, Long userId) {
        // Recherche de l'utilisateur par ID
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            // Si l'utilisateur existe, l'attribuer au profil
            User user = optionalUser.get();
            profile.setUser(user);
            // Enregistrer le profil dans la base de données
            return profileRepository.save(profile);
        } else {
            // Gérer le cas où l'utilisateur n'existe pas
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }

    @Override
    public Profil getProfileById(Long profileId) {
        Optional<Profil> optionalProfile = profileRepository.findById(profileId);
        return optionalProfile.orElse(null);
    }

    @Override
    public List<Profil> getAllProfiles() {
        return profileRepository.findAll();
    }

    @Override
    public void deleteProfile(Long profileId) {
        profileRepository.deleteById(profileId);
    }
    // Implémentez d'autres méthodes de service nécessaires
}
