import { useState, useEffect } from 'react';
import {
    Box, Heading, FormControl, FormLabel, Input, Button, Select,
    Flex, VStack, Text, Grid, useToast, Badge, Spinner
} from '@chakra-ui/react';
import axios from 'axios';
import { api } from '../actions/api';
import PageWrapper from '../wrapper/PageWrapper';
import AnimatedSection from '../wrapper/AnimatedSection';

const StatBadge = ({ label, value, unit }) => (
    <Box
        flex={1}
        px={4}
        py={3}
        borderRadius="10px"
        bg="rgba(255,255,255,0.03)"
        border="1px solid rgba(255,255,255,0.07)"
        textAlign="center"
    >
        <Text fontSize="xs" color="#6B7FA3" fontWeight={500} textTransform="uppercase" letterSpacing="0.08em" mb={1}>
            {label}
        </Text>
        <Text fontSize="xl" fontWeight={700} color="white" lineHeight={1}>
            {value || '—'}
            {unit && <Text as="span" fontSize="sm" color="#6B7FA3" fontWeight={400}> {unit}</Text>}
        </Text>
    </Box>
);

const FieldBlock = ({ label, children }) => (
    <FormControl>
        <FormLabel
            fontSize="11px"
            fontWeight={600}
            color="#6B7FA3"
            textTransform="uppercase"
            letterSpacing="0.1em"
            mb={2}
        >
            {label}
        </FormLabel>
        {children}
    </FormControl>
);

const inputStyles = {
    bg: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    color: 'white',
    fontSize: 'sm',
    fontWeight: 500,
    _placeholder: { color: '#3D4F6E' },
    _hover: { border: '1px solid rgba(255,255,255,0.18)', bg: 'rgba(255,255,255,0.06)' },
    _focus: { border: '1px solid rgba(99,179,237,0.5)', bg: 'rgba(255,255,255,0.06)', boxShadow: '0 0 0 3px rgba(99,179,237,0.08)' },
};

const chipBtn = {
    size: 'xs',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    bg: 'rgba(255,255,255,0.06)',
    color: '#94A3B8',
    border: '1px solid rgba(255,255,255,0.08)',
    _hover: { bg: 'rgba(255,255,255,0.1)', color: 'white' },
    _active: { bg: 'rgba(255,255,255,0.14)' },
    transition: 'all 0.15s',
    h: '26px',
    px: 3,
};

export const AdminUpdate = () => {
    const [matchId, setMatchId] = useState('match1');
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [runs, setRuns] = useState('');
    const [wickets, setWickets] = useState('');
    const [overs, setOvers] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (!matchId) return;
        setFetching(true);
        axios.get(api + '/livescore', { params: { matchId } })
            .then((res) => {
                const data = res.data;
                setTeam1(data.team1 || '');
                setTeam2(data.team2 || '');
                setRuns(data.runs !== undefined ? String(data.runs) : '');
                setWickets(data.wickets !== undefined ? String(data.wickets) : '');
                setOvers(data.overs !== undefined ? String(data.overs) : '');
            })
            .catch(() => {})
            .finally(() => setFetching(false));
    }, [matchId]);

    const handleUpdate = async () => {
        setLoading(true);
        const payload = { matchId };
        if (team1) payload.team1Name = team1;
        if (team2) payload.team2Name = team2;
        if (runs !== '') payload.runs = runs;
        if (wickets !== '') payload.wickets = wickets;
        if (overs !== '') payload.overs = overs;

        await axios.post(api + '/score', payload)
            .then((res) => {
                const m = res.data.match;
                setTeam1(m.team1);
                setTeam2(m.team2);
                setRuns(String(m.runs));
                setWickets(String(m.wickets));
                setOvers(String(m.overs));
                toast({
                    title: 'Score updated',
                    description: `${m.team1} vs ${m.team2} — ${m.runs}/${m.wickets} (${m.overs})`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                });
            })
            .catch(() => {
                toast({
                    title: 'Update failed',
                    description: 'Could not push the score. Check your connection and try again.',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top-right',
                });
            })
            .finally(() => setLoading(false));
    };

    const nudge = (getter, setter, delta) => {
        const current = parseFloat(getter) || 0;
        const next = Math.max(0, parseFloat((current + delta).toFixed(1)));
        setter(String(next));
    };

    return (
        <PageWrapper pt={0}>
            <Flex
                minH="calc(100vh - 80px)"
                align="center"
                justify="center"
                px={{ base: 3, md: 6 }}
                py={{ base: 6, md: 10 }}
                bg="#080E1A"
            >
                <AnimatedSection style={{ width: '100%', maxWidth: '820px' }}>
                    {/* Header strip */}
                    <Flex
                        align="center"
                        justify="space-between"
                        mb={5}
                        px={1}
                        flexWrap="wrap"
                        gap={2}
                    >
                        <Box>
                            <Heading size="lg" color="white" fontWeight={800} letterSpacing="-0.02em">
                                Live Score Control
                            </Heading>
                        </Box>
                        <Badge
                            px={3}
                            py={1}
                            borderRadius="full"
                            bg="rgba(59,130,246,0.12)"
                            color="#60A5FA"
                            fontSize="11px"
                            fontWeight={700}
                            border="1px solid rgba(59,130,246,0.25)"
                            textTransform="uppercase"
                            letterSpacing="0.08em"
                        >
                            ● Live
                        </Badge>
                    </Flex>

                    {/* Main card */}
                    <Box
                        w="full"
                        borderRadius="16px"
                        bg="#0D1526"
                        border="1px solid rgba(255,255,255,0.07)"
                        boxShadow="0 24px 64px rgba(0,0,0,0.5)"
                        overflow="hidden"
                    >
                        {/* Match selector row */}
                        <Box
                            px={{ base: 5, md: 8 }}
                            py={5}
                            bg="rgba(255,255,255,0.02)"
                            borderBottom="1px solid rgba(255,255,255,0.06)"
                        >
                            <FieldBlock label="Select Match">
                                <Select
                                    value={matchId}
                                    onChange={(e) => setMatchId(e.target.value)}
                                    {...inputStyles}
                                    icon={fetching ? <Spinner size="xs" color="#60A5FA" /> : undefined}
                                >
                                    <option value="match1" style={{ backgroundColor: '#0D1526' }}>Match 1</option>
                                    <option value="match2" style={{ backgroundColor: '#0D1526' }}>Match 2</option>
                                </Select>
                            </FieldBlock>
                        </Box>

                        <VStack spacing={0} align="stretch">
                            {/* Teams section */}
                            <Box px={{ base: 5, md: 8 }} py={6} borderBottom="1px solid rgba(255,255,255,0.05)">
                                <Text fontSize="11px" fontWeight={700} color="#6B7FA3" textTransform="uppercase" letterSpacing="0.1em" mb={4}>
                                    Teams
                                </Text>
                                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                                    <FieldBlock label="Team 1">
                                        <Input
                                            value={team1}
                                            onChange={(e) => setTeam1(e.target.value)}
                                            placeholder="e.g. CIC Hackers"
                                            {...inputStyles}
                                        />
                                    </FieldBlock>
                                    <FieldBlock label="Team 2">
                                        <Input
                                            value={team2}
                                            onChange={(e) => setTeam2(e.target.value)}
                                            placeholder="e.g. ECE Rockers"
                                            {...inputStyles}
                                        />
                                    </FieldBlock>
                                </Grid>
                            </Box>

                            {/* Score section */}
                            <Box px={{ base: 5, md: 8 }} py={6} borderBottom="1px solid rgba(255,255,255,0.05)">
                                <Text fontSize="11px" fontWeight={700} color="#6B7FA3" textTransform="uppercase" letterSpacing="0.1em" mb={4}>
                                    Scorecard
                                </Text>
                                <Grid templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} gap={4}>
                                    {/* Runs */}
                                    <FieldBlock label="Runs">
                                        <Input
                                            type="number"
                                            value={runs}
                                            onChange={(e) => setRuns(e.target.value)}
                                            placeholder="0"
                                            {...inputStyles}
                                            mb={2}
                                        />
                                        <Grid templateColumns="repeat(4, 1fr)" gap={1}>
                                            <Button {...chipBtn} onClick={() => nudge(runs, setRuns, 1)}>+1</Button>
                                            <Button {...chipBtn} onClick={() => nudge(runs, setRuns, 4)}>+4</Button>
                                            <Button {...chipBtn} onClick={() => nudge(runs, setRuns, 6)}>+6</Button>
                                            <Button {...chipBtn} onClick={() => nudge(runs, setRuns, -1)} isDisabled={!runs || parseInt(runs) <= 0}>−1</Button>
                                        </Grid>
                                    </FieldBlock>

                                    {/* Wickets */}
                                    <FieldBlock label="Wickets">
                                        <Input
                                            type="number"
                                            value={wickets}
                                            onChange={(e) => setWickets(e.target.value)}
                                            placeholder="0"
                                            min={0} max={10}
                                            {...inputStyles}
                                            mb={2}
                                        />
                                        <Grid templateColumns="repeat(2, 1fr)" gap={1}>
                                            <Button {...chipBtn} onClick={() => nudge(wickets, setWickets, 1)}>+1</Button>
                                            <Button {...chipBtn} onClick={() => nudge(wickets, setWickets, -1)} isDisabled={!wickets || parseInt(wickets) <= 0}>−1</Button>
                                        </Grid>
                                    </FieldBlock>

                                    {/* Overs */}
                                    <FieldBlock label="Overs">
                                        <Input
                                            type="number"
                                            step="0.1"
                                            value={overs}
                                            onChange={(e) => setOvers(e.target.value)}
                                            placeholder="0.0"
                                            {...inputStyles}
                                            mb={2}
                                        />
                                        <Grid templateColumns="repeat(2, 1fr)" gap={1}>
                                            <Button {...chipBtn} onClick={() => nudge(overs, setOvers, 0.1)}>+0.1</Button>
                                            <Button {...chipBtn} onClick={() => nudge(overs, setOvers, 1)}>+1.0</Button>
                                        </Grid>
                                    </FieldBlock>
                                </Grid>
                            </Box>

                            {/* Live preview */}
                            <Box px={{ base: 5, md: 8 }} py={5} borderBottom="1px solid rgba(255,255,255,0.05)">
                                <Text fontSize="11px" fontWeight={700} color="#6B7FA3" textTransform="uppercase" letterSpacing="0.1em" mb={4}>
                                    Preview
                                </Text>
                                <Box
                                    borderRadius="12px"
                                    border="1px solid rgba(59,130,246,0.15)"
                                    bg="rgba(59,130,246,0.04)"
                                    overflow="hidden"
                                >
                                    {/* Teams header */}
                                    <Flex
                                        px={5}
                                        py={4}
                                        align="center"
                                        justify="space-between"
                                        borderBottom="1px solid rgba(255,255,255,0.05)"
                                        flexWrap="wrap"
                                        gap={3}
                                    >
                                        <Box>
                                            <Text fontWeight={700} color="white" fontSize="md">{team1 || 'Team 1'}</Text>
                                            <Text fontSize="11px" color="#3D4F6E" fontWeight={600} textTransform="uppercase" letterSpacing="0.06em" my={0.5}>vs</Text>
                                            <Text fontWeight={700} color="white" fontSize="md">{team2 || 'Team 2'}</Text>
                                        </Box>
                                        <Box textAlign={{ base: 'left', sm: 'right' }}>
                                            <Flex align="baseline" gap={1} justify={{ base: 'flex-start', sm: 'flex-end' }}>
                                                <Text fontSize={{ base: '3xl', md: '4xl' }} fontWeight={800} color="white" lineHeight={1}>
                                                    {runs || '0'}
                                                </Text>
                                                <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#3D4F6E" lineHeight={1}>/</Text>
                                                <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#64748B" lineHeight={1}>
                                                    {wickets || '0'}
                                                </Text>
                                            </Flex>
                                            <Text fontSize="sm" color="#64748B" fontWeight={500} mt={0.5}>
                                                {overs || '0.0'} overs
                                            </Text>
                                        </Box>
                                    </Flex>
                                    {/* Stat chips */}
                                    <Flex px={5} py={3} gap={3} flexWrap="wrap">
                                        <StatBadge label="Runs" value={runs || '0'} />
                                        <StatBadge label="Wickets" value={wickets || '0'} />
                                        <StatBadge label="Overs" value={overs || '0.0'} />
                                    </Flex>
                                </Box>
                            </Box>

                            {/* Action */}
                            <Box px={{ base: 5, md: 8 }} py={6}>
                                <Button
                                    onClick={handleUpdate}
                                    width="full"
                                    size="lg"
                                    fontSize="sm"
                                    fontWeight={700}
                                    letterSpacing="0.04em"
                                    isLoading={loading}
                                    loadingText="Pushing update..."
                                    borderRadius="10px"
                                    bg="#2563EB"
                                    color="white"
                                    _hover={{ bg: '#1D4ED8', transform: 'translateY(-1px)', boxShadow: '0 8px 24px rgba(37,99,235,0.35)' }}
                                    _active={{ bg: '#1E40AF', transform: 'translateY(0)' }}
                                    transition="all 0.15s"
                                    h="48px"
                                >
                                    Push Score Update
                                </Button>
                                <Text fontSize="11px" color="#3D4F6E" textAlign="center" mt={3}>
                                    Changes go live immediately across all connected clients
                                </Text>
                            </Box>
                        </VStack>
                    </Box>
                </AnimatedSection>
            </Flex>
        </PageWrapper>
    );
};