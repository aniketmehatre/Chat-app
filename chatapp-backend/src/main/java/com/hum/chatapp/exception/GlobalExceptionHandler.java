package com.hum.chatapp.exception;

import com.hum.chatapp.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

  
    @ExceptionHandler(InternalServerErrorException.class)
    public ResponseEntity<ApiResponse> handleInternalServerErrorException(InternalServerErrorException e) {
        return new ResponseEntity<>(
                ApiResponse.builder()
                        .statusCode(500)
                        .status("Failed")
                        .reason("I - " + e.getMessage())
                        .build(),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    /**
     * Handle general exceptions.
     *
     * @param e The general exception to handle.
     * @return A ResponseEntity with an ApiResponse representing a general internal server error.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGeneralException(Exception e) {
        return new ResponseEntity<>(
                ApiResponse.builder()
                        .statusCode(500)
                        .status("Failed")
                        .reason(e.getMessage())
                        .build(),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
