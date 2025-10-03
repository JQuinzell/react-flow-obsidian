import { useMemo } from 'react'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import { ObsidianNode } from './ObsidianNode'
import { ObsidianEdge } from './ObsidianEdge'
import { useLayoutedElements } from './layoutNodes'

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Classical Mechanics' },
    type: 'obsidian',
  },
  {
    id: '2',
    position: { x: 0, y: 0 },
    data: { label: 'Quantum Mechanics' },
    type: 'obsidian',
  },
  {
    id: '3',
    position: { x: 0, y: 0 },
    data: { label: "Newton's Laws" },
    type: 'obsidian',
  },
  {
    id: '4',
    position: { x: 0, y: 0 },
    data: { label: 'Wave-Particle Duality' },
    type: 'obsidian',
  },
  {
    id: '5',
    position: { x: 0, y: 0 },
    data: { label: 'Relativity' },
    type: 'obsidian',
  },
]
const initialEdges = [
  { id: 'e1-3', source: '1', target: '3', type: 'obsidian' },
  { id: 'e2-4', source: '2', target: '4', type: 'obsidian' },
  { id: 'e1-5', source: '1', target: '5', type: 'obsidian' },
  { id: 'e2-5', source: '2', target: '5', type: 'obsidian' },
]

export default function App() {
  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const nodeTypes = useMemo(
    () => ({
      obsidian: ObsidianNode,
    }),
    []
  )
  const edgeTypes = useMemo(
    () => ({
      obsidian: ObsidianEdge,
    }),
    []
  )

  useLayoutedElements()

  return (
    <div className='w-screen h-screen bg-gray-800'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={{
          hideAttribution: true,
        }}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}
