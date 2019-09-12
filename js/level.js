const levelOne = `
3333333333333333333333333333333333333333333333333333333333333
2                                                           2
2                          111                111           2
2                                                           2
2                     111                                   2
2                                                           2
2               11                              1111        2
2                             1111111                       2
2       111                                                 2
2                                                           2
2                                1111111111                 2
2             1111                                          2
2                                                           2
2                    111                                    2
2                                          111              2
211111111                                                   2
2                                                           2
2                                     11111111              2
2          1111                                             2
2                                                           2
2                            P                              2
2  11111                                                    2
2                                                           2
2                                              11111111111  2
2            1111111                                        2
2                                                           2
2                                                           2
111111111111111111111111111111111111111111111111111111111111
`;

class Level {
	constructor(data) {
		data = data.trim();

		let x = 0;
		let y = 0;

		[...data].forEach((element) => {
			if (element === '\n') {
				x = 0;
				y += 32;
				return;
			}

			const blockColliders = {
				1: blockCollider,
				2: verticalBlockCollider,
				3: horizontalBlockCollider,
			};

			const blockSprites = {
				1: groundSprite,
			};

			if (['1', '2', '3'].includes(element)) {
				const block = new Block({
					sprite: blockSprites[element],
					pos: { x, y },
					collider: blockColliders[element],
					material: blockMaterial,
				});

				entities.push(block);
			} else if (element === 'P') {
				const player = new Player({
					sprites: {
						running: boiRunningSprite,
						idle: boiIdleSprite,
						kicking: boiKickingSprite,
						jumping: boiJumpingSprite,
						fighting: boiFightingSprite,
					},
					pos: { x, y },
					collider: boiCollider,
					material: boiMaterial,
					velocity: { x: 0, y: 0 },
				});

				entities.push(player);
			}
			x += 32;
		});
	}
}
