package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.Profil;
import com.example.testeditions.Services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profiles")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/create")
    public ResponseEntity<Profil> createProfile(@RequestBody Profil profile, @RequestParam("userId") Long userId) {
        try {
            // Créer le profil et l'associer à l'utilisateur spécifié
            Profil createdProfile = profileService.createProfile(profile, userId);
            return new ResponseEntity<>(createdProfile, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Gérer les erreurs, par exemple si l'utilisateur spécifié n'existe pas
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profil> getProfileById(@PathVariable("id") Long profileId) {
        Profil profile = profileService.getProfileById(profileId);
        if (profile != null) {
            return new ResponseEntity<>(profile, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<Profil>> getAllProfiles() {
        List<Profil> profiles = profileService.getAllProfiles();
        return new ResponseEntity<>(profiles, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable("id") Long profileId) {
        profileService.deleteProfile(profileId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Implémentez d'autres méthodes de contrôleur si nécessaire
}
