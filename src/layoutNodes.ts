import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
} from 'd3-force'
import { useNodesInitialized, useReactFlow, type Edge } from '@xyflow/react'
import { useEffect } from 'react'

export const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges } = useReactFlow()
  const initialized = useNodesInitialized()

  useEffect(() => {
    const nodes = getNodes().map((node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    }))
    const edges = getEdges().map((edge) => edge)

    const simulation = forceSimulation(nodes)
      .force(
        'link',
        forceLink(edges)
          .id((d) => (d as Edge).id)
          .strength(0.05)
          .distance(100) // Increase or decrease to change how tightly nodes cluster.
      )
      .force('charge', forceManyBody().strength(-100)) // Adjust repulsion for clustering behavior.
      .force(
        'center',
        forceCenter(window.innerWidth / 2, window.innerHeight / 2)
      )

    let animationFrameId: number
    const tick = () => {
      simulation.tick()
      setNodes(
        nodes.map((node) => ({
          ...node,
          position: { x: node.x, y: node.y },
        }))
      )

      animationFrameId = window.requestAnimationFrame(tick)
    }
    animationFrameId = window.requestAnimationFrame(tick)

    return () => {
      simulation.stop()
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [initialized, getNodes, getEdges, setNodes])
}
