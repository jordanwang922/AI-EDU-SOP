"use client";

import type { ReactNode } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type ProblemSortRow = { id: string; title: string; sortOrder: number };

function SortableProblemRow({
  id,
  children,
}: {
  id: string;
  children: (listeners: Record<string, unknown>) => ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.85 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-2 rounded-lg border border-transparent bg-[#F7FAF8]/50 py-1"
      {...attributes}
    >
      {children((listeners ?? {}) as Record<string, unknown>)}
    </div>
  );
}

export function ProblemSortList({
  categoryId,
  initialProblems,
  updateSubProblem,
  deleteSubProblem,
}: {
  categoryId: string;
  initialProblems: ProblemSortRow[];
  updateSubProblem: (formData: FormData) => void | Promise<void>;
  deleteSubProblem: (formData: FormData) => void | Promise<void>;
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialProblems);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  async function persistOrder(nextIds: string[]) {
    const res = await fetch("/api/problems/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ categoryId, orderedIds: nextIds }),
    });
    if (res.ok) router.refresh();
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const next = arrayMove(items, oldIndex, newIndex).map((row, index) => ({
      ...row,
      sortOrder: index,
    }));
    setItems(next);
    void persistOrder(next.map((x) => x.id));
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-[#7E8780]">
        拖拽左侧「⋮⋮」调整二级问题顺序；保存/删除逻辑不变。
      </p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((p) => (
            <SortableProblemRow key={p.id} id={p.id}>
              {(handleListeners) => (
                <>
                  <button
                    type="button"
                    className="mt-1 shrink-0 cursor-grab touch-manipulation rounded px-1 text-lg leading-none text-[#7E8780] active:cursor-grabbing [-webkit-tap-highlight-color:transparent]"
                    aria-label="拖拽排序"
                    {...handleListeners}
                  >
                    ⋮⋮
                  </button>
                  <form
                    action={updateSubProblem}
                    className="grid min-w-0 flex-1 grid-cols-[1fr_auto_auto] gap-2"
                  >
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="categoryId" value={categoryId} />
                    <input
                      name="title"
                      defaultValue={p.title}
                      className="rounded border border-[#CFD6C4] px-2 py-1"
                    />
                    <button type="submit" className="rounded bg-[#FDE8D3] px-2 py-1 text-sm">
                      保存
                    </button>
                    <ConfirmDeleteProblem formAction={deleteSubProblem} />
                  </form>
                </>
              )}
            </SortableProblemRow>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

function ConfirmDeleteProblem({
  formAction,
}: {
  formAction: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <button
      type="submit"
      formAction={formAction}
      className="rounded bg-[#F3C3B2] px-2 py-1 text-sm"
      onClick={(e) => {
        if (typeof window !== "undefined" && !window.confirm("确定删除这条二级问题吗？")) {
          e.preventDefault();
        }
      }}
    >
      删除
    </button>
  );
}
