import { Button, Container, Group, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export default function ProductNotFound() {
  const navigate = useNavigate();

  return (
    <Container size="md" py="xl">
      <Text size="xl" ta="center">Product not found</Text>
      <Group justify="center" mt="xl">
        <Button onClick={() => navigate('/')}>
          Back to Products
        </Button>
      </Group>
    </Container>)
}
