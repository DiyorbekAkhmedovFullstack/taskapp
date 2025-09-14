package com.example.taskapp.service;

import com.example.taskapp.dto.CTestRequest;
import com.example.taskapp.dto.CTestResponse;
import com.example.taskapp.dto.CTestResult;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class CTestService {

    private static final Pattern SENTENCE_PATTERN = Pattern.compile("[.!?]+\\s+");
    private static final Pattern WORD_PATTERN = Pattern.compile("\\b\\w+\\b");

    public CTestResponse generateCTest(CTestRequest request) {
        String originalText = request.getText().trim();
        String[] sentences = SENTENCE_PATTERN.split(originalText);

        if (sentences.length < 2) {
            throw new IllegalArgumentException("Text must contain at least 2 sentences");
        }

        StringBuilder testText = new StringBuilder();
        List<String> correctAnswers = new ArrayList<>();
        int gapCount = 0;

        // First sentence remains intact
        testText.append(sentences[0]).append(". ");

        // Process remaining sentences
        for (int sentenceIndex = 1; sentenceIndex < sentences.length; sentenceIndex++) {
            String sentence = sentences[sentenceIndex].trim();
            if (sentence.isEmpty()) continue;

            String[] words = sentence.split("\\s+");
            boolean isSecondWord = false;

            for (String word : words) {
                // Clean word from punctuation for processing
                String cleanWord = word.replaceAll("[^\\p{L}\\p{N}]", "");
                String punctuation = word.replaceAll("[\\p{L}\\p{N}]", "");

                if (isSecondWord && cleanWord.length() >= 3) {
                    // Create gap: keep first half, remove second half
                    int cutPoint = (cleanWord.length() + 1) / 2;
                    String firstHalf = cleanWord.substring(0, cutPoint);
                    String secondHalf = cleanWord.substring(cutPoint);

                    testText.append(firstHalf).append("_".repeat(secondHalf.length())).append(punctuation).append(" ");
                    correctAnswers.add(secondHalf);
                    gapCount++;
                } else {
                    // Keep word intact
                    testText.append(word).append(" ");
                }

                // Toggle for every word
                isSecondWord = !isSecondWord;
            }

            // Add sentence ending
            if (sentenceIndex < sentences.length - 1) {
                testText.append(". ");
            }
        }

        return new CTestResponse(testText.toString().trim(), correctAnswers, gapCount);
    }

    public CTestResult checkAnswers(List<String> userAnswers, List<String> correctAnswers) {
        if (userAnswers.size() != correctAnswers.size()) {
            throw new IllegalArgumentException("Answer count mismatch");
        }

        int correct = 0;
        for (int i = 0; i < userAnswers.size(); i++) {
            String userAnswer = userAnswers.get(i).trim().toLowerCase();
            String correctAnswer = correctAnswers.get(i).trim().toLowerCase();

            if (userAnswer.equals(correctAnswer)) {
                correct++;
            }
        }

        double score = ((double) correct / correctAnswers.size()) * 100;
        String feedback = generateFeedback(score);

        return new CTestResult(correct, correctAnswers.size(), score, userAnswers, correctAnswers, feedback);
    }

    private String generateFeedback(double score) {
        if (score >= 90) return "Ausgezeichnet! Sehr gute Deutschkenntnisse.";
        else if (score >= 80) return "Sehr gut! Solide Deutschkenntnisse.";
        else if (score >= 70) return "Gut! Gute Grundkenntnisse vorhanden.";
        else if (score >= 60) return "Befriedigend. Noch Verbesserungspotential.";
        else if (score >= 50) return "Ausreichend. Mehr Übung erforderlich.";
        else return "Ungenügend. Intensive Deutschstudien empfohlen.";
    }
}
