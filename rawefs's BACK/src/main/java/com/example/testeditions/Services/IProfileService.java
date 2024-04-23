package com.example.testeditions.Services;



import com.example.testeditions.Entites.Profil;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IProfileService {
    public Profil createProfile(Profil profile, Long userId);
    Profil getProfileById(Long profileId);
    List<Profil> getAllProfiles();
    void deleteProfile(Long profileId);
}

