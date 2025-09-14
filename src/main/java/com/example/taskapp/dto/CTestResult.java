package com.example.taskapp.dto;

import java.util.List;

public class CTestResult {
    private int correctAnswers;
    private int totalQuestions;
    private double score;
    private List<String> userAnswers;
    private List<String> correctAnswersList;
    private String feedback;

    public CTestResult() {}

    public CTestResult(int correctAnswers, int totalQuestions, double score,
                       List<String> userAnswers, List<String> correctAnswersList, String feedback) {
        this.correctAnswers = correctAnswers;
        this.totalQuestions = totalQuestions;
        this.score = score;
        this.userAnswers = userAnswers;
        this.correctAnswersList = correctAnswersList;
        this.feedback = feedback;
    }

    // Getters and Setters
    public int getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(int correctAnswers) { this.correctAnswers = correctAnswers; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }

    public List<String> getUserAnswers() { return userAnswers; }
    public void setUserAnswers(List<String> userAnswers) { this.userAnswers = userAnswers; }

    public List<String> getCorrectAnswersList() { return correctAnswersList; }
    public void setCorrectAnswersList(List<String> correctAnswersList) { this.correctAnswersList = correctAnswersList; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
}
