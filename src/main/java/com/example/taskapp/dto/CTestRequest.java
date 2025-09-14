package com.example.taskapp.dto;

public class CTestRequest {
    private String text;

    public CTestRequest() {}

    public CTestRequest(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
