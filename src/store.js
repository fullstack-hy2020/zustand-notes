import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useNoteStore = create((set) => ({
  notes: [],
  filter: '',
  actions: {
    add: note => set(
      state => ({ notes: state.notes.concat(note) })
    ),
    toggleImportance: id => set(
      state => ({
        notes: state.notes.map(note =>
          note.id === id ? { ...note, important: !note.important } : note
        )
      })
    ),
    setFilter: value => set(() => ({ filter: value })),
    initialize: notes => set(() => ({ notes }))
  }
}))

export const useNotes = () => useNoteStore(useShallow(({ notes, filter }) => {
  if (filter === 'important') return notes.filter(n => n.important)
  if (filter === 'nonimportant') return notes.filter(n => !n.important)
  return notes
}))
export const useFilter = () => useNoteStore((state) => state.filter)
export const useNoteActions = () => useNoteStore((state) => state.actions)
