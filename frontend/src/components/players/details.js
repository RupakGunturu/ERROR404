import { useState, useMemo } from "react";
import {
  Input,
  Box,
  Heading,
  Flex,
  VStack,
  Text,
  HStack,
  Select,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import playersData from '../../data/players.json';
import PageWrapper from '../wrapper/PageWrapper';
import AnimatedSection from '../wrapper/AnimatedSection';

const teams = ['All', 'IT', 'CIC', 'CSE', 'EEE', 'CIVIL', 'MECH'];
const teamColors = {
  IT: { bg: 'rgba(46,134,193,0.15)', text: '#2E86C1', border: 'rgba(46,134,193,0.3)' },
  CIC: { bg: 'rgba(212,160,23,0.15)', text: '#D4A017', border: 'rgba(212,160,23,0.3)' },
  CSE: { bg: 'rgba(231,76,60,0.15)', text: '#E74C3C', border: 'rgba(231,76,60,0.3)' },
  EEE: { bg: 'rgba(46,204,113,0.15)', text: '#2ECC71', border: 'rgba(46,204,113,0.3)' },
  CIVIL: { bg: 'rgba(155,89,182,0.15)', text: '#9B59B6', border: 'rgba(155,89,182,0.3)' },
  MECH: { bg: 'rgba(230,126,34,0.15)', text: '#E67E22', border: 'rgba(230,126,34,0.3)' },
};

const TeamBadge = ({ team, size = 'sm' }) => {
  const c = teamColors[team] || teamColors.IT;
  return (
    <Text
      as="span"
      fontSize={size === 'sm' ? 'xs' : 'sm'}
      fontWeight={600}
      color={c.text}
      bg={c.bg}
      border="1px solid"
      borderColor={c.border}
      px={size === 'sm' ? 2.5 : 3}
      py={size === 'sm' ? 0.5 : 1}
      borderRadius="full"
      whiteSpace="nowrap"
    >
      {team}
    </Text>
  );
};

const StatsBar = ({ total, teamCount, totalRuns, totalWickets }) => (
  <Flex
    wrap="wrap"
    gap={{ base: 2, md: 4 }}
    justify="center"
    p={4}
    borderRadius="16px"
    bg="rgba(26,39,68,0.5)"
    border="1px solid rgba(255,255,255,0.06)"
  >
    {[
      { label: 'Players', value: total, icon: '🏏' },
      { label: 'Teams', value: teamCount, icon: '🏳️' },
      { label: 'Total Runs', value: totalRuns.toLocaleString(), icon: '📊' },
      { label: 'Total Wickets', value: totalWickets, icon: '🎯' },
    ].map((stat, i) => (
      <HStack key={i} spacing={2} px={{ base: 3, md: 5 }} py={1}>
        <Text fontSize="lg">{stat.icon}</Text>
        <Box>
          <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight={800} color="white" lineHeight={1.2}>
            {stat.value}
          </Text>
          <Text fontSize="xs" color="surface.400" fontWeight={500}>
            {stat.label}
          </Text>
        </Box>
      </HStack>
    ))}
  </Flex>
);

export const StudentData = () => {
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('All');
  const [sortBy, setSortBy] = useState('runs');

  const stats = useMemo(() => {
    const teams_set = new Set(playersData.map(p => p.Team));
    return {
      total: playersData.length,
      teamCount: teams_set.size,
      totalRuns: playersData.reduce((s, p) => s + p.Runs, 0),
      totalWickets: playersData.reduce((s, p) => s + p.Wickets, 0),
    };
  }, []);

  const filtered = useMemo(() => {
    let result = [...playersData];

    if (teamFilter !== 'All') {
      result = result.filter(p => p.Team === teamFilter);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.PlayerName.toLowerCase().includes(q) ||
        p.Team.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'runs') result.sort((a, b) => b.Runs - a.Runs || b.Wickets - a.Wickets);
    else if (sortBy === 'wickets') result.sort((a, b) => b.Wickets - a.Wickets || b.Runs - a.Runs);
    else if (sortBy === 'name') result.sort((a, b) => a.PlayerName.localeCompare(b.PlayerName));

    return result;
  }, [teamFilter, search, sortBy]);

  const RankBadge = ({ rank }) => {
    if (rank === 1) return <Text fontSize="lg">🥇</Text>;
    if (rank === 2) return <Text fontSize="lg">🥈</Text>;
    if (rank === 3) return <Text fontSize="lg">🥉</Text>;
    return (
      <Text fontSize="sm" color="surface.500" fontWeight={600} textAlign="center" minW="28px">
        {rank}
      </Text>
    );
  };

  return (
    <PageWrapper>
      <VStack spacing={6} align="stretch" py={4}>
        <AnimatedSection style={{ width: '100%' }}>
          <VStack spacing={1} align="center">
            <Heading size="xl" color="white" fontWeight={800}>
              🏏 Cricket Player Data
            </Heading>
            <Text color="surface.400" fontSize="sm">
              SRKR College — Season Statistics
            </Text>
          </VStack>
        </AnimatedSection>

        <AnimatedSection delay={0.08} style={{ width: '100%' }}>
          <StatsBar {...stats} />
        </AnimatedSection>

        <AnimatedSection delay={0.12} style={{ width: '100%' }}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={3}
            align="stretch"
            justify="space-between"
          >
            <Flex wrap="wrap" gap={2} flex="1">
              {teams.map(team => {
                const active = teamFilter === team;
                const c = team === 'All'
                  ? { bg: 'rgba(255,255,255,0.08)', text: 'white', border: 'rgba(255,255,255,0.15)' }
                  : teamColors[team];
                return (
                  <Box
                    key={team}
                    as="button"
                    onClick={() => setTeamFilter(team)}
                    px={3.5}
                    py={1.5}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight={600}
                    cursor="pointer"
                    bg={active ? (team === 'All' ? 'rgba(255,255,255,0.15)' : c.bg) : 'rgba(255,255,255,0.04)'}
                    color={active ? (team === 'All' ? 'white' : c.text) : 'surface.400'}
                    border="1px solid"
                    borderColor={active ? (team === 'All' ? 'rgba(255,255,255,0.2)' : c.border) : 'rgba(255,255,255,0.06)'}
                    _hover={{ bg: active ? undefined : 'rgba(255,255,255,0.08)' }}
                    transition="all 0.2s"
                  >
                    {team}
                    {team !== 'All' && ` (${playersData.filter(p => p.Team === team).length})`}
                  </Box>
                );
              })}
            </Flex>

            <HStack spacing={3} flexShrink={0}>
              <Box position="relative" w={{ base: 'full', md: '220px' }}>
                <Input
                  placeholder="Search player..."
                  onChange={(e) => setSearch(e.target.value)}
                  size="md"
                  pl={8}
                />
                <SearchIcon
                  position="absolute"
                  left={3}
                  top="50%"
                  transform="translateY(-50%)"
                  color="surface.500"
                  boxSize={3.5}
                />
              </Box>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                w={{ base: 'auto', md: '140px' }}
                size="md"
              >
                <option value="runs" style={{ backgroundColor: '#0F1B33', color: 'white' }}>By Runs</option>
                <option value="wickets" style={{ backgroundColor: '#0F1B33', color: 'white' }}>By Wickets</option>
                <option value="name" style={{ backgroundColor: '#0F1B33', color: 'white' }}>By Name</option>
              </Select>
            </HStack>
          </Flex>
        </AnimatedSection>

        <AnimatedSection delay={0.16} style={{ width: '100%' }}>
          <Box
            borderRadius="16px"
            overflow="hidden"
            border="1px solid rgba(255,255,255,0.06)"
            sx={{
              'div::-webkit-scrollbar': { width: '6px', height: '6px' },
              'div::-webkit-scrollbar-thumb': { bg: '#2E86C1', borderRadius: '3px' },
              'div::-webkit-scrollbar-track': { bg: 'rgba(255,255,255,0.03)' },
            }}
          >
            {/* Desktop Table */}
            <Box display={{ base: 'none', md: 'block' }} overflowX="auto" overflowY="auto" maxH="540px">
              <Box as="table" w="full" sx={{ borderCollapse: 'collapse' }}>
                <Box as="thead" position="sticky" top={0} zIndex={2}>
                  <Box as="tr" bg="rgba(15,27,51,0.95)" borderBottom="2px solid rgba(212,160,23,0.3)">
                    {['#', 'Player Name', 'Team', 'Runs', 'Wickets'].map(h => (
                      <Box
                        key={h}
                        as="th"
                        px={4}
                        py={3.5}
                        textAlign={h === '#' || h === 'Runs' || h === 'Wickets' ? 'center' : 'left'}
                        color="accent.400"
                        fontSize="xs"
                        fontWeight={700}
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        {h}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box as="tbody">
                  {filtered.length > 0 ? (
                    filtered.map((player, index) => {
                      const rank = index + 1;
                      const isTop3 = rank <= 3;
                      return (
                        <Box
                          key={player.PlayerName + player.Team}
                          as="tr"
                          bg={isTop3 ? 'rgba(212,160,23,0.04)' : index % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent'}
                          borderBottom="1px solid rgba(255,255,255,0.04)"
                          _hover={{ bg: 'rgba(212,160,23,0.06)' }}
                          transition="background 0.15s"
                        >
                          <Box as="td" px={4} py={3} textAlign="center">
                            <RankBadge rank={rank} />
                          </Box>
                          <Box as="td" px={4} py={3}>
                            <Text fontWeight={600} color="white" fontSize="sm">
                              {player.PlayerName}
                            </Text>
                          </Box>
                          <Box as="td" px={4} py={3}>
                            <TeamBadge team={player.Team} />
                          </Box>
                          <Box as="td" px={4} py={3} textAlign="center">
                            <Text fontWeight={700} color="accent.400" fontSize="md">
                              {player.Runs.toLocaleString()}
                            </Text>
                          </Box>
                          <Box as="td" px={4} py={3} textAlign="center">
                            <Text fontWeight={600} color="surface.200" fontSize="sm">
                              {player.Wickets}
                            </Text>
                          </Box>
                        </Box>
                      );
                    })
                  ) : (
                    <Box as="tr">
                      <Box as="td" colSpan={5} textAlign="center" py={12}>
                        <VStack spacing={2}>
                          <Text fontSize="2xl">🔍</Text>
                          <Text color="surface.500" fontSize="sm">No players match your filter</Text>
                        </VStack>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Mobile Cards */}
            <Box display={{ base: 'block', md: 'none' }} p={3}>
              {filtered.length > 0 ? (
                <VStack spacing={3} align="stretch">
                  {filtered.map((player, index) => {
                    const rank = index + 1;
                    return (
                      <Flex
                        key={player.PlayerName + player.Team}
                        p={4}
                        borderRadius="12px"
                        bg={rank <= 3 ? 'rgba(212,160,23,0.06)' : 'rgba(26,39,68,0.5)'}
                        border="1px solid"
                        borderColor={rank <= 3 ? 'rgba(212,160,23,0.2)' : 'rgba(255,255,255,0.06)'}
                        align="center"
                        gap={3}
                      >
                        <Box minW="32px" textAlign="center">
                          <RankBadge rank={rank} />
                        </Box>
                        <Box flex="1" minW={0}>
                          <Text fontWeight={600} color="white" fontSize="sm" noOfLines={1}>
                            {player.PlayerName}
                          </Text>
                          <TeamBadge team={player.Team} />
                        </Box>
                        <Box textAlign="right">
                          <Text fontWeight={700} color="accent.400" fontSize="md">
                            {player.Runs.toLocaleString()}
                          </Text>
                          <Text fontSize="xs" color="surface.400">{player.Wickets} wkts</Text>
                        </Box>
                      </Flex>
                    );
                  })}
                </VStack>
              ) : (
                <Flex justify="center" py={12}>
                  <VStack spacing={2}>
                    <Text fontSize="2xl">🔍</Text>
                    <Text color="surface.500" fontSize="sm">No players match your filter</Text>
                  </VStack>
                </Flex>
              )}
            </Box>
          </Box>

          <Text textAlign="center" color="surface.500" fontSize="xs">
            Showing {filtered.length} of {playersData.length} players
            {teamFilter !== 'All' && ` · ${teamFilter} team`}
          </Text>
        </AnimatedSection>
      </VStack>
    </PageWrapper>
  );
};
