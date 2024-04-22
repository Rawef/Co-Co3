package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.AnnonceColocation;
import com.example.testeditions.Services.AnnonceColocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/annonces")
public class AnnonceColocationController {

    @Autowired
    private AnnonceColocationService annonceColocationService;

    @GetMapping
    public List<AnnonceColocation> getAllAnnonces() {
        return annonceColocationService.getAllAnnonces();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnonceColocation> getAnnonceById(@PathVariable Long id) {
        Optional<AnnonceColocation> annonceOptional = annonceColocationService.getAnnonceById(id);
        if (annonceOptional.isPresent()) {
            AnnonceColocation annonce = annonceOptional.get();
            annonce.setNombreVues(annonce.getNombreVues() + 1); // Incrémente le compteur de vues
            annonceColocationService.updateAnnonce(id, annonce); // Met à jour l'annonce dans la base de données
            return ResponseEntity.ok().body(annonce);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<AnnonceColocation> createAnnonce(@RequestBody AnnonceColocation annonceColocation) {
        AnnonceColocation createdAnnonce = annonceColocationService.createAnnonce(annonceColocation);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAnnonce);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnnonceColocation> updateAnnonce(@PathVariable Long id, @RequestBody AnnonceColocation newAnnonce) {
        AnnonceColocation updatedAnnonce = annonceColocationService.updateAnnonce(id, newAnnonce);
        return updatedAnnonce != null ? ResponseEntity.ok().body(updatedAnnonce) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnonce(@PathVariable Long id) {
        annonceColocationService.deleteAnnonce(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/search")
    public ResponseEntity<List<AnnonceColocation>> searchAnnonces(@RequestParam("query") String query) {
        List<AnnonceColocation> annonces = annonceColocationService.searchAnnonces(query);
        return ResponseEntity.ok().body(annonces);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AnnonceColocation>> getAnnoncesByUserId(@PathVariable Long userId) {
        List<AnnonceColocation> annonces = annonceColocationService.getAnnoncesByUserId(userId);
        return ResponseEntity.ok().body(annonces);
    }
    @GetMapping("/preferences/{userId}")
    public List<AnnonceColocation> getannonceprefernces(@PathVariable Long userId){
        return annonceColocationService.getAnnoncesSelonPreferences(userId);
    }
}