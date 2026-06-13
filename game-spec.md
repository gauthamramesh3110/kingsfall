# Simultaneous Chess — Game Spec

*Working title. A chess-like, team-based game where both teams move every piece at the same time. Capture the enemy king to win.*

---

## 1. Overview

Two teams face off on a square board. Each team has five pieces — King, Queen, Rook, Knight, Bishop — each controlled by a player (or by one human controlling several, or by a bot). Every turn, both teams secretly choose all their moves, and everything resolves simultaneously. You win by capturing the enemy king, which means predicting and intercepting its movement rather than cornering a stationary target.

---

## 2. Setup

- **Board:** square checkerboard. Size is a config constant — prototype `5×5`, `6×6`, and `7×7`.
- **Teams:** two, five pieces each — King, Queen, Rook, Knight, Bishop. Standard chess movement.
- **Start:** pieces sit on the back rank, one per file, king centered; the two armies face each other.
- **Players:** one per piece. One human may control several pieces; bots can fill empty seats so the game is playable below 10 humans.
- **Removed from chess:** pawns, castling, en passant, promotion, and the "can't move into check" rule. A king *may* move into a capture and simply lose — there is no illegal-move-into-check concept under simultaneity.

---

## 3. The Turn (simultaneous)

1. Both teams get a fixed timer (start at **10s**) and choose at the same time.
2. Each player picks a destination square for their piece, or **skips** (stays put).
3. You see your **teammates'** picks live as they lock in. You never see the **enemy's**.
4. Two teammates may **not** pick the same destination square.
5. No pick by the buzzer = that piece stays where it is.
6. When time runs out, every piece on both teams moves at once.

---

## 4. Resolution

Resolve the whole turn off **end squares**, not start squares.

- Each piece has an end square. A skip means `end square = current square`.
- **Path blocking:** sliders (queen, rook, bishop) are blocked along their path based on **starting** positions; knights jump. Two pieces whose paths merely cross do not interact — only end squares matter.
- **Capture:** a piece is captured when an enemy piece ends on the same square it ends on. (Moving onto a square an enemy is *vacating* is not a capture — they're already gone.)

---

## 5. Combat (points-based)

Each piece has a strength value. When two enemies end on the same square, strength decides who survives.

| Piece  | Strength |
|--------|:-------:|
| Queen  | 5 |
| Rook   | 4 |
| Bishop | 3 |
| Knight | 2 |
| King   | 1 |

- Higher strength **survives and takes the square**; the lower is removed.
- **Equal strength → both removed** (a trade).
- The **king loses every fight** — anything that shares its square captures it.
- Because teammates can't share a square, every contested square is exactly **one-vs-one**, so resolution is always a clean pairwise comparison.

**Consequences worth knowing:** a piece can only be traded off by its equal (so, with one of each, queens tend to leave the board in pairs), and you can only *safely* block an attacker with an equal-or-stronger piece. Strong pieces therefore double as bodyguards.

---

## 6. Winning

- **Win:** capture the enemy king.
- **Draw:** both kings captured on the same turn.
- **Move cap:** a maximum turn count forces an ending. If it's reached with no king captured, the team with more captured-material points wins. This is a **tiebreaker only** — king capture is always the real goal.

---

## 7. Resurrection

A comeback mechanic that brings dead teammates back, balanced so games still close.

- Each team has a **resurrection box** deep in enemy territory (yours sits on *their* side; mirrored).
- **End a turn on your box** → revive one dead teammate. You choose who; never the king (a captured king has already ended the game).
- The revived piece returns to its **home square** at full strength. You pick who returns at the start of the next turn.
- **Capped per game** (start with 2) so the losing side can't stall forever.
- The box is a **normal square** — the enemy can guard it, and your courier has to win that collision to claim it.

---

## 8. Parameters to Prototype

These are the knobs to tune by playtesting, not by solving on paper.

| Parameter | Default | Try |
|-----------|---------|-----|
| Board size | — | 5×5, 6×6, 7×7 |
| Turn timer | 10s | 8–15s |
| Strength values | Q5 R4 B3 N2 K1 | — |
| Equal-strength outcome | both die | attacker survives |
| Knight vs. bishop | distinct (2 vs. 3) | equal (both 3) so they trade |
| Resurrection cap | 2 per team | 1–3 |
| Respawn location | home square | the box itself (spicier) |
| Move cap | on | tune the number |
| Material tiebreaker | on | off |

---

## 9. Open Design Notes

- **Board size is the big feel decision.** Small (5×5) plays fast and chaotic but shallows out the prediction game and weakens resurrection (no depth to traverse). Larger (7×7) gives room to maneuver and leans harder on the move cap + tiebreaker to close out. Build size as one constant and feel the difference across a few games.
- **Mate = coverage, not luck.** A king is forced when your attackers can cover *every* square it could end on (its reachable squares plus staying put). Loose positions are guessing games; won positions are forced. Worth prototyping the king-hunt first — if that feels good, the game works.
