import { Button, Group, TextInput, ActionIcon, Checkbox, Divider, ScrollArea, Stack, Text, Drawer } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { IconFilter, IconList, IconX, IconGrid3x3 } from '@tabler/icons-react';
import { useState } from 'react';
import { sortOptions } from '../constants';
import type { MobileFiltersProps } from '../types/mobile-filters';

export default function MobileFilters({
  categories,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
}: MobileFiltersProps) {
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSortBy('name');
  };

  const handleApply = () => {
    setOpened(false);
  };

  if (!isMobile) return null;

  return (
    <Group mb="xl" className="gap-4">
      <TextInput
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        className="flex-1"
      />

      <Button
        variant="outline"
        leftSection={<IconFilter size={16} />}
        onClick={() => setOpened(true)}
        className="w-full"
        aria-label="Open filters and sorting options"
      >
        Filters & Sort
      </Button>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom"
        size="auto"
        transitionProps={{ duration: 500 }}
        withCloseButton={false}
        styles={{
          content: {
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            opacity: 1,
          },
        }}
      >
        <div className="p-4">
          {/* Header */}
          <Group justify="space-between" mb="lg">
            <Text size="lg" fw={600}>
              Filters & Sort
            </Text>
            <Group gap="xs">
              <Button 
                variant="subtle" 
                size="sm" 
                onClick={handleReset}
                aria-label="Reset all filters and sorting"
              >
                Reset
              </Button>
              <ActionIcon
                variant="subtle"
                onClick={() => setOpened(false)}
                aria-label="Close filters"
                title="Close filters"
              >
                <IconX size={18} />
              </ActionIcon>
            </Group>
          </Group>

          <ScrollArea h={600}>
            <Stack gap="lg">
              {/* Categories Section */}
              <div>
                <Text size="md" fw={500} mb="md">
                  Categories
                </Text>
                <Stack gap="xs">
                  <Checkbox
                    label="All Categories"
                    checked={selectedCategory === null}
                    onChange={() => setSelectedCategory(null)}
                  />
                  {categories.map((category) => (
                    <Checkbox
                      key={category.value}
                      label={category.label}
                      checked={selectedCategory === category.value}
                      onChange={() => handleCategorySelect(category.value)}
                    />
                  ))}
                </Stack>
              </div>

              <Divider />

              {/* Sort Section */}
              <div>
                <Text size="md" fw={500} mb="md">
                  Sort By
                </Text>
                <Stack gap="xs">
                  {sortOptions.map((option) => (
                    <Checkbox
                      key={option.value}
                      label={option.label}
                      checked={sortBy === option.value}
                      onChange={() => setSortBy(option.value)}
                    />
                  ))}
                </Stack>
              </div>

              <Divider />

              {/* View Mode Section */}
              <div>
                <Text size="md" fw={500} mb="md">
                  View Mode
                </Text>
                <Group gap="md">
                  <ActionIcon
                    variant={viewMode === 'grid' ? 'filled' : 'subtle'}
                    color="blue"
                    size="xl"
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <IconGrid3x3 size={20} />
                  </ActionIcon>
                  <ActionIcon
                    variant={viewMode === 'list' ? 'filled' : 'subtle'}
                    color="blue"
                    size="xl"
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <IconList size={20} />
                  </ActionIcon>
                </Group>
              </div>
            </Stack>
          </ScrollArea>

          {/* Apply Button */}
          <Button
            fullWidth
            size="lg"
            mt="xl"
            onClick={handleApply}
            className="sticky bottom-0"
            aria-label="Apply selected filters and close"
          >
            Apply Filters
          </Button>
        </div>
      </Drawer>
    </Group >
  )
}
