"use client";

import { Card, Text, Button, Group, Badge, Paper, Alert } from "@mantine/core";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Flashcard({ flashcard, onUnderstanding }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [feedback, setFeedback] = useState("");

  // Extract question, answer, hint, and choices
  const { question, answer, hint, choices } = flashcard;

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice); ///do more stuff with this state..
    
    // Check if the selected choice is the correct answer
    const isCorrect = choice === answer; // Compare directly with the answer
    setFeedback(isCorrect ? "Correct! 🎉" : "Incorrect, try again.");
  
    // Optionally reset selected choice after a delay
    setTimeout(() => {
      setSelectedChoice(null);
    }, 1000); // Adjust the timeout duration as needed
  };
  return (
    <Paper
      shadow="md"
      radius="md"
      p="md"
      style={{
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        maxWidth: "850px",
      }}
    >
      <motion.div
        style={{
          perspective: "1000px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "relative",
            width: "900px",
            minHeight: "400px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front of the card */}
          <Card
            shadow="sm"
            p="lg"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              display: isFlipped ? "none" : "block",
              textAlign: "center",
            }}
          >
            <Text size="xl" weight={500}>
              {question}
            </Text>

            {/* Render choices */}
            <div style={{ marginTop: "10px" }}>
              {!isFlipped && choices && choices.length > 0 && (
                <>
                  {Object.keys(choices[0]).map((key, index) => (
                    <Button
                      key={index} // Use the index as the key 
                      variant="outline"
                      style={{ marginTop: "5px", width: "100%" }}
                      onClick={() => handleChoiceSelect(choices[0][key])} // Access the choice using the key
                    >
                      {choices[0][key]} {/* Render the choice value */}
                    </Button>
                  ))}
                </>
              )}
            </div>

            {showHint && (
              <Badge color="blue" mt="md">
                {hint}
              </Badge>
            )}

            <Group position="center" mt="md">
              <Button
                variant="light"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHint(!showHint);
                }}
              >
                {showHint ? "Hide Hint" : "Show Hint"}
              </Button>
              <Button
                variant="light"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(!isFlipped);
                }}
              >
                Flip to View Answer
              </Button>
            </Group>

            {/* Feedback message */}
            {feedback && (
              <Alert
                title={feedback === "Correct! 🎉" ? "Success" : "Oops!"}
                color={feedback === "Correct! 🎉" ? "green" : "red"}
                mt="md"
              >
                {feedback}
              </Alert>
            )}
          </Card>

          {/* Back of the card */}
          <Card
            shadow="sm"
            p="lg"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              display: isFlipped ? "block" : "none",
              textAlign: "center",
            }}
          >
            <Text size="xl" weight={500}>
              {answer}
            </Text>

            <Group position="center" mt="md">
              <Button
                color="green"
                onClick={(e) => {
                  e.stopPropagation();
                  onUnderstanding("understood");
                }}
              >
                Understood
              </Button>
              <Button
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                  onUnderstanding("review");
                }}
              >
                Need Review
              </Button>
              <Button
                variant="light"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(!isFlipped);
                }}
              >
                Back to Question
              </Button>
            </Group>
          </Card>
        </motion.div>
      </motion.div>
    </Paper>
  );
}
