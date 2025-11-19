import { Center, Container, Text } from '@mantine/core'

export default function ProductListingError({ error }: { error: Error }) {
  return (
    <Container size="xl" py="xl">
      <Center>
        <div className="text-center">
          <Text size="xl" c="red" mb="md">
            Failed to load products
          </Text>
          <Text c="gray.7" mb="xl">
            {error?.message || 'Something went wrong while loading the product catalog.'}
          </Text>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            aria-label="Retry loading products"
          >
            Retry
          </button>
        </div>
      </Center>
    </Container>)
}
