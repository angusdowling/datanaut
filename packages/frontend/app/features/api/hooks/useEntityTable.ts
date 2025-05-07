import { useState, useEffect } from "react";
import { usePatchRecord } from "./usePatchRecord";

interface EntityTableConfig<T, CreateDto, UpdateDto> {
  data?: { data: T[] };
  createEntity: (data: { data: CreateDto }) => Promise<any>;
  updateEntity: (data: { id: string; data: UpdateDto }) => Promise<any>;
  deleteEntity: (data: { id: string }) => Promise<any>;
}

export function useEntityTable<
  T extends { id?: string },
  CreateDto,
  UpdateDto,
>({
  data,
  createEntity,
  updateEntity,
  deleteEntity,
}: EntityTableConfig<T, CreateDto, UpdateDto>) {
  const [tableData, setTableData] = useState<T[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<T | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const debouncedPatchRecord = usePatchRecord<T, UpdateDto>(
    updateEntity,
    tableData
  );

  useEffect(() => {
    if (data?.data) {
      setTableData(data.data);
    }
  }, [data?.data]);

  const handleCreateEntity = () => {
    setIsCreateDialogOpen(true);
  };

  const handleDeleteEntity = async (entity: T) => {
    setSelectedEntity(entity);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedEntity?.id) {
      await deleteEntity({ id: selectedEntity.id });
      setIsDeleteDialogOpen(false);
      setSelectedEntity(null);
    }
  };

  const handleCreate = async (formData: CreateDto) => {
    await createEntity({ data: formData });
    setIsCreateDialogOpen(false);
  };

  return {
    tableData,
    setTableData,
    selectedEntity,
    isCreateDialogOpen,
    isDeleteDialogOpen,
    setIsCreateDialogOpen,
    setIsDeleteDialogOpen,
    handleCreateEntity,
    handleDeleteEntity,
    confirmDelete,
    handleCreate,
    debouncedPatchRecord,
  };
}
