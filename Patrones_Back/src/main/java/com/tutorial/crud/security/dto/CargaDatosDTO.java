package com.tutorial.crud.security.dto;

import org.springframework.web.multipart.MultipartFile;

public class CargaDatosDTO {
    private String nombreEscuela;
    private MultipartFile archivoExcel;

    // Getters y setters

    public String getNombreEscuela() {
        return nombreEscuela;
    }

    public void setNombreEscuela(String nombreEscuela) {
        this.nombreEscuela = nombreEscuela;
    }

    public MultipartFile getArchivoExcel() {
        return archivoExcel;
    }

    public void setArchivoExcel(MultipartFile archivoExcel) {
        this.archivoExcel = archivoExcel;
    }
}