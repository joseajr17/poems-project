package com.poems.backend.service;

import com.amazonaws.services.s3.AmazonS3;
import com.poems.backend.domain.photo.Photo;
import com.poems.backend.domain.photo.PhotoRequestDTO;
import com.poems.backend.domain.photo.PhotoResponseDTO;
import com.poems.backend.domain.poem.Poem;
import com.poems.backend.domain.poem.PoemRequestDTO;
import com.poems.backend.domain.poem.PoemResponseDTO;
import com.poems.backend.repositories.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PhotoService {

    @Value("${aws.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;

    @Autowired
    private PhotoRepository photoRepository;

    public Photo createPhoto(PhotoRequestDTO data) {
        String url = "";

        if(data.imageFile() != null) {
            url = this.uploadImage(data.imageFile());
        }

        Photo newPhoto = new Photo();

        newPhoto.setTitle(data.title());
        newPhoto.setUrl(url);

        photoRepository.save(newPhoto);

        return newPhoto;
    }

    private String uploadImage(MultipartFile multipartFile) {
        String fileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();

        try {
            File file = this.convertMultipartToFile(multipartFile);

            s3Client.putObject(bucketName, fileName, file);
            file.delete();
            return s3Client.getUrl(bucketName, fileName).toString();

        } catch (Exception e) {
            System.out.println("Erro ao subir arquivo");
            return null;
        }
    }

    private File convertMultipartToFile (MultipartFile multipartFile) throws IOException {
        File convFile = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));

        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(multipartFile.getBytes());
        fos.close();

        return convFile;
    }

    public List<PhotoResponseDTO> getPhotos() {
        return photoRepository.findAll()
                .stream().map(
                        photo -> new PhotoResponseDTO(
                                photo.getId(),
                                photo.getTitle(),
                                photo.getUrl()
                        ))
                .collect(Collectors.toList());
    }
}
