package com.example.taskapp.dto;

import java.util.List;

public class CTestResponse {
    private String testText;
    private List<String> correctAnswers;
    private int totalGaps;

    public CTestResponse() {}

    public CTestResponse(String testText, List<String> correctAnswers, int totalGaps) {
        this.testText = testText;
        this.correctAnswers = correctAnswers;
        this.totalGaps = totalGaps;
    }

    public String getTestText() {
        return testText;
    }

    public void setTestText(String testText) {
        this.testText = testText;
    }

    public List<String> getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(List<String> correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public int getTotalGaps() {
        return totalGaps;
    }

    public void setTotalGaps(int totalGaps) {
        this.totalGaps = totalGaps;
    }
}
