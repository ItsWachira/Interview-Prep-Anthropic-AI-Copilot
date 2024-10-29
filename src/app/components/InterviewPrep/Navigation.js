"use client"

import { Group, Button, Text, Progress, Paper, Stack } from '@mantine/core';

export default function Navigation({ currentCard, totalCards, onNext, onPrevious, correctAnswers }) {
  const progress = (correctAnswers / totalCards) * 100;

  return (
    <Paper shadow="sm" p="md" radius="md" style={{ width: '98%' }}>
      <Stack spacing="md">
        <Group position="apart">
          <Button
            variant="light"
            onClick={onPrevious}
            disabled={currentCard === 0}
          >
            Previous
          </Button>
          
          <Text weight={500}>
            Card {currentCard + 1} of {totalCards}
          </Text>
          
          <Button
            variant="light"
            onClick={onNext}
            disabled={currentCard === totalCards - 1}
          >
            Next
          </Button>
        </Group>

        <Progress
          value={progress}
          label={`${Math.round(progress)}%`}
          size="lg"
          radius="xl"
          color={progress > 75 ? "green" : progress > 50 ? "yellow" : "red"}
        />
      </Stack>
    </Paper>
  );
}
