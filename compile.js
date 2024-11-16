const path = require('path');
const fs = require('fs');
const solc = require('solc');

try {
    const contractPath = path.resolve(__dirname, 'TicketSale.sol');
    const source = fs.readFileSync(contractPath, 'utf8');

    console.log('Source code length:', source.length);

    const input = {
        language: 'Solidity',
        sources: {
            'TicketSale.sol': {
                content: source,
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*'],
                },
            },
            optimizer: {
                enabled: true,
                runs: 200
            }
        },
    };

    console.log('Compiling contract...');
    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    // Check for compilation errors
    if (output.errors) {
        output.errors.forEach(error => {
            console.error(error.formattedMessage);
        });
        if (output.errors.some(error => error.severity === 'error')) {
            throw new Error('Compilation failed');
        }
    }

    const contract = output.contracts['TicketSale.sol']['TicketSale'];
    
    if (!contract) {
        throw new Error('Contract not found in compilation output');
    }

    const contractOutput = {
        abi: contract.abi,
        bytecode: contract.evm.bytecode.object
    };

    // Verify the bytecode
    if (!contractOutput.bytecode) {
        throw new Error('Bytecode is empty');
    }

    console.log('Bytecode length:', contractOutput.bytecode.length);
    console.log('ABI length:', contractOutput.abi.length);

    fs.writeFileSync(
        'TicketSale.json',
        JSON.stringify(contractOutput, null, 2)
    );
    console.log('Compilation successful! Output written to TicketSale.json');
} catch (error) {
    console.error('Compilation Error:', error);
    process.exit(1);
} 