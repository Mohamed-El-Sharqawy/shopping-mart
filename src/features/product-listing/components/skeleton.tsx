import { Container, Grid } from '@mantine/core'
import { ProductSkeleton } from '../../../components/ProductSkeleton'
import { useMediaQuery } from '@mantine/hooks'

export default function ProductListingSkeleton() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container size="xl" py="xl">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>

        {/* Filter skeleton */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 h-10 bg-gray-200 rounded"></div>
          {!isMobile && (
            <>
              <div className="w-48 h-10 bg-gray-200 rounded"></div>
              <div className="w-48 h-10 bg-gray-200 rounded"></div>
            </>
          )}
          {isMobile && <div className="w-32 h-10 bg-gray-200 rounded"></div>}
        </div>

        {/* Products skeleton */}
        <Grid>
          {Array.from({ length: 20 }).map((_, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductSkeleton />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </Container>
  )
}
