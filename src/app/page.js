"use client";

import { useState } from "react";
import { 
  Container, 
  Stack, 
  Title, 
  Text, 
  Paper,
  Box,
  useMantineTheme,
  Group
} from "@mantine/core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import Flashcard from "./components/InterviewPrep/Flashcard";
import Navigation from "./components/InterviewPrep/Navigation";


export default function Home() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);    

  const theme = useMantineTheme();

    // Provide the flashcards state to the Copilot context
    useCopilotReadable({
      description: "Current flashcards",
      value: flashcards,
    });
  const handleUnderstanding = (level) => {
    if (level === "understood") {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  useCopilotAction({
    name: "generateFlashcards",
    description: `
    Generate interview preparation material based on user input. 
    The generated content should include an array of objects, each containing:
    - question: the interview prep question,
    - answer: the answer to the question,
    - hint: a hint for the question,
    - choices: an object with multiple choice options (choice1, choice2, choice3).
   STRICTLY, DO NOT Render the content on the CopilotSidebar component UI chat window!
    If you must return a response after generating the flashcards content, just return
    'I have finished generating your flashcards.'
  `,
 parameters: [
      {
        name: "flashcardsContent",
        type: "object[]", 
        description: "The flashcards content a user has requested to be rendered on flash cards for interview prep.",
        attributes: [
          { name: "question", type: "string", description: "The interview prep question to be added to the flashcard." },
          { name: "answer", type: "string", description: "The answer to the interview prep question." },
          { name: "hint", type: "string", description: "A hint for the interview question." },
          {
            name: "choices",
            type: "object[]", 
            description: "Multiple choice options for the question.",
            attributes: [
              { name: "choice1", type: "string", description: "First choice option" },
              { name: "choice2", type: "string", description: "Second choice option" },
              { name: "choice3", type: "string", description: "Third choice option" },
            ]
          },
        ],
      }
    ],
    handler: async ({ flashcardsContent }) => {
      setFlashcards(flashcardsContent);
    },
    render: "Creating Your flashcards...",
  });
  console.log(flashcards)
 return (
  <Container size="md" py="xl" style={{ marginLeft: '24px' }}>
      <Paper 
        shadow="md" 
        p="xl" 
        radius="lg" 
        style={{ 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          minHeight: '90vh' 
        }}
      >
        <Stack spacing="xl" align="center">
          <Box 
            py="lg" 
            style={{ 
              width: '100%', 
              textAlign: 'center',
              borderRadius: theme.radius.lg,
              background: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            <Title 
              order={1} 
              style={{ 
                color: theme.colors.blue[7],
                fontSize: '2.5rem',
                fontWeight: 700
              }}
            >
              Tech Interview Prep Flashcards
            </Title>

            <Text 
              size="lg" 
              color="dimmed" 
              mt="md"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Use the Copilot to generate the interview prep material for whichever topic you want!
            </Text>
          </Box>

          <Group position="center" style={{ width: '100%' }}>
            <Box style={{ flex: 1, maxWidth: '350px' }}>
              <CopilotSidebar
                instructions="Help the user create interview prep flashcards."
                labels={{
                  initial: "Welcome! Describe the topic you need interview prep for.",
                }}
                defaultOpen={true}
                clickOutsideToClose={false}
              />
            </Box>

            {flashcards && flashcards.length > 0 && (
              <Box style={{ width: '100%' }}>
                <Flashcard
                  flashcard={flashcards[currentCard]}
                  onUnderstanding={handleUnderstanding}
                />
                <Navigation
                  currentCard={currentCard}
                  totalCards={flashcards.length}
                  onNext={() => setCurrentCard((c) => Math.min(c + 1, flashcards.length - 1))}
                  onPrevious={() => setCurrentCard((c) => Math.max(c - 1, 0))}
                  correctAnswers={correctAnswers}
                />
              </Box>
            )}
          </Group>
        </Stack>
      </Paper>
    </Container>
  );

}