import { Group, TextInput, Select, ActionIcon } from '@mantine/core'
import { IconGrid3x3, IconList } from '@tabler/icons-react';
import type { DesktopFiltersProps } from '../types/desktop-filters';
import { sortOptions } from '../constants';

export default function ProductListingDesktopFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  categories,
}: DesktopFiltersProps) {
  return (
    <Group mb="xl" className="flex-wrap gap-4">
      <TextInput
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        className="flex-1 min-w-64"
      />

      <Select
        placeholder="All Categories"
        data={categories}
        value={selectedCategory}
        onChange={setSelectedCategory}
        clearable
        className="min-w-48"
      />

      <Select
        placeholder="Sort by"
        data={sortOptions}
        value={sortBy}
        onChange={(value) => setSortBy(value || 'name')}
        className="min-w-48"
      />

      {/* View Mode Toggle */}
      <Group gap="xs">
        <ActionIcon
          variant={viewMode === 'grid' ? 'filled' : 'subtle'}
          color="blue"
          size="lg"
          onClick={() => setViewMode('grid')}
          aria-label="Grid view"
        >
          <IconGrid3x3 size={18} />
        </ActionIcon>
        <ActionIcon
          variant={viewMode === 'list' ? 'filled' : 'subtle'}
          color="blue"
          size="lg"
          onClick={() => setViewMode('list')}
          aria-label="List view"
        >
          <IconList size={18} />
        </ActionIcon>
      </Group>
    </Group>
  )
}