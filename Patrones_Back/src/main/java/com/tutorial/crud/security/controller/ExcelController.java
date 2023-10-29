package com.tutorial.crud.security.controller;

import com.tutorial.crud.security.entity.Escuela;
import com.tutorial.crud.security.entity.Estudiante;
import com.tutorial.crud.security.service.EscuelaService;
import com.tutorial.crud.security.service.EstudianteService;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Iterator;

@RestController
@RequestMapping("/excel")
@CrossOrigin(origins = "http://localhost:4200")

/*

A veces me pregunto como soy tan bueno programando
no se de Spring ni de anotaaciones y ya arregle las
dependencias y el cors en un ratico.

Nah mentiras sin usted no fuese podido hacer practicamente
nada de esto; Ty little Starguy.

*/

public class ExcelController {

    @Autowired
    private EscuelaService escuelaService;
    @Autowired
    private EstudianteService estudianteService;

    @PostMapping("/cargar")
    public ResponseEntity<String> cargarArchivo(@RequestParam("nombreEscuela") String nombreEscuela, @RequestParam("archivo") MultipartFile archivo) {
        try (Workbook workbook = new XSSFWorkbook(archivo.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);

            Iterator<Row> rowIterator = sheet.iterator();

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();

                if (row.getLastCellNum() < 4) {
                    return new ResponseEntity<>("El archivo no contiene todos los datos requeridos", HttpStatus.BAD_REQUEST);
                }

                Estudiante estudiante = new Estudiante();
                estudiante.setNombre(row.getCell(0).getStringCellValue());
                estudiante.setPeso(row.getCell(1).getNumericCellValue());
                estudiante.setEstatura(row.getCell(2).getNumericCellValue());
                estudiante.setEdad((int) row.getCell(3).getNumericCellValue());

                // Asigna el estudiante a la escuela (puedes obtener la escuela por nombre)
                // Guarda el estudiante en la base de datos

                // Ejemplo de cómo obtener la escuela por nombre
                Escuela escuela = escuelaService.obtenerEscuelaPorNombre(nombreEscuela);
                if (escuela == null) {
                    escuela = new Escuela();
                    escuela.setNombre(nombreEscuela);
                    escuelaService.guardarEscuela(escuela);
                }
                estudiante.setEscuela(escuela);
                estudianteService.guardarEstudiante(estudiante);
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "application/json")
                    .body("{\"message\": \"datos guadados" + "\"}");
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error al procesar el archivo", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
