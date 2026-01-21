# Verification Methodology

This document outlines the sources, verification procedures, and quality standards used to compile the Library of the Blind collection.

## Primary Reference Sources

### Authoritative Braille References

| Source | Type | Coverage | URL |
|--------|------|----------|-----|
| **Perkins School for the Blind - World Braille Usage** | Primary Reference | 133+ Braille systems globally | https://www.perkins.org/resource/world-braille-usage/ |
| **International Council on English Braille (ICEB)** | Standards Body | Unified English Braille standards | https://www.iceb.org/ |
| **Braille Authority of North America (BANA)** | Standards Body | North American Braille standards | https://www.brailleauthority.org/ |
| **UK Association for Accessible Formats (UKAAF)** | Standards Body | UK Braille standards | https://www.ukaaf.org/ |
| **UNESCO Atlas of the World's Languages in Danger** | Language Reference | Language vitality and documentation | https://en.wal.unesco.org/ |

### DeafBlind and Tactile Communication References

| Source | Type | Coverage | URL |
|--------|------|----------|-----|
| **DeafBlind International** | Organization | Global DeafBlind communication methods | https://www.deafblindinternational.org/ |
| **Helen Keller National Center** | Organization | Tactile communication systems (USA) | https://www.helenkeller.org/ |
| **National Center on Deaf-Blindness** | Research Center | Communication methodologies | https://www.nationaldb.org/ |
| **Sense UK** | Organization | DeafBlind communication (UK) | https://www.sense.org.uk/ |

### Academic and Encyclopedia Sources

| Source | Type | Coverage | URL |
|--------|------|----------|-----|
| **Wikipedia - Tactile Alphabet** | Encyclopedia | Historical and modern systems | https://en.wikipedia.org/wiki/Tactile_alphabet |
| **Ethnologue** | Language Database | Sign language classifications | https://www.ethnologue.com/ |
| **Gallaudet University Linguistics** | Academic | Sign language and DeafBlind research | https://gallaudet.edu/linguistics/ |

## Verification Criteria

Each entry in the collection must meet the following criteria:

### 1. Documentation Requirement
- **Minimum**: At least one verifiable reference source (Wikipedia, academic publication, or official organization documentation)
- **Preferred**: Multiple independent sources confirming the system's existence and usage

### 2. Distinctiveness Requirement
Each system must be demonstrably distinct, meaning it requires:
- Its own translation tables, OR
- Its own teaching materials, OR
- Its own publishing pipeline, OR
- Distinct community of users

### 3. Status Classification

| Status | Definition | Verification Standard |
|--------|------------|----------------------|
| **Active** | Currently in use by a community | Evidence of contemporary usage (post-2000 documentation) |
| **Legacy** | Historically significant but largely superseded | Historical documentation with clear timeline of usage |
| **Historical** | No longer in active use | Historical documentation only |
| **Obsolete** | Formally deprecated or replaced | Documentation of deprecation |

## Counting Methodology

### Included in Count (323 total)

1. **Braille Systems (196)**
   - Language-specific Braille codes with distinct character mappings
   - Regional variants with significant orthographic differences
   - Specialized notation systems (music, math, science)
   - Historical Braille systems with documented usage

2. **Alternative Tactile Scripts (127)**
   - Pre-Braille embossed letter systems
   - Dot-based alternatives to standard Braille
   - Modern alternative tactile scripts
   - Finger-spelling and manual alphabets
   - Ancient and historical tactile systems
   - DeafBlind communication methodologies

### Excluded from Count

1. **Sub-variants marked "Part of" parent system**
   - Example: Afrikaans as part of South African Braille
   - These share translation tables with parent system

2. **Technology/Devices (61 items documented separately)**
   - Screen readers, embossers, displays, apps
   - These are implementation tools, not communication methodologies

3. **Multimodal combinations**
   - Screen Reader + Braille combinations
   - These combine existing systems rather than creating new ones

## Quality Assurance Process

### Entry Addition Protocol

1. **Research Phase**
   - Identify potential system through authoritative sources
   - Verify distinctiveness from existing entries
   - Document primary and secondary sources

2. **Verification Phase**
   - Confirm active usage or historical significance
   - Cross-reference with Perkins World Braille Usage when applicable
   - Verify geographic and linguistic scope

3. **Documentation Phase**
   - Create entry following standard format
   - Include verifiable reference links
   - Assign appropriate status classification
   - Add to INVENTORY.csv with unique ID

### Periodic Review

- Annual review of Active status entries for continued usage
- Updates based on new academic research
- Incorporation of newly documented systems

## Source Hierarchy

When sources conflict, priority is given in the following order:

1. **Official standards bodies** (ICEB, BANA, national Braille authorities)
2. **Specialized organizations** (Perkins, DeafBlind International)
3. **Academic publications** (peer-reviewed journals)
4. **Encyclopedia sources** (Wikipedia with citations)
5. **Community documentation** (organization websites, user guides)

## Data Integrity

### Version Control
- All changes tracked via Git version control
- Commit history provides audit trail
- Major updates documented in commit messages

### Cross-Referencing
- INVENTORY.csv synchronized with README.md entries
- Category counts verified against detailed listings
- Automated validation possible via CSV parsing

## Contact for Verification Inquiries

For questions about verification methodology or to report corrections:
- Open an issue on the GitHub repository
- Reference the specific entry ID from INVENTORY.csv
- Provide documentation supporting the correction

---

*Last updated: January 2026*
*Total verified entries: 323 (196 Braille + 127 Alternative Tactile)*
