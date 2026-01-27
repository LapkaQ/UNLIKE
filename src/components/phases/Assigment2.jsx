import { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'
import questionsData from '../../assets/questions.json'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  Separator,
  Badge,
} from '@radix-ui/themes'
import {
  EyeOpenIcon,
  EyeNoneIcon,
  PersonIcon,
  RocketIcon,
} from '@radix-ui/react-icons'

export default function Assignment2() {
  const { state, dispatch } = useContext(GameContext)
  return <div>Assignment Phase 2</div>

  // Tutaj można dodać dalszą logikę dla fazy przydzielania ról
}

// Tutaj można dodać dodatkowe funkcje lub hooki, które będą potrzebne w fazie przydzielania ról
