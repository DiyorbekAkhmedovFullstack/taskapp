package com.example.taskapp.controller;

import com.example.taskapp.dto.CTestRequest;
import com.example.taskapp.dto.CTestResponse;
import com.example.taskapp.dto.CTestResult;
import com.example.taskapp.service.CTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/c-test")
@CrossOrigin(origins = {"http://localhost:4200", "https://studiwelt.com"})
public class CTestController {

    @Autowired
    private CTestService cTestService;

    @PostMapping("/generate")
    public ResponseEntity<CTestResponse> generateCTest(@RequestBody CTestRequest request) {
        try {
            CTestResponse response = cTestService.generateCTest(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/check")
    public ResponseEntity<CTestResult> checkAnswers(@RequestBody Map<String, Object> requestBody) {
        try {
            @SuppressWarnings("unchecked")
            List<String> userAnswers = (List<String>) requestBody.get("userAnswers");
            @SuppressWarnings("unchecked")
            List<String> correctAnswers = (List<String>) requestBody.get("correctAnswers");

            CTestResult result = cTestService.checkAnswers(userAnswers, correctAnswers);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
