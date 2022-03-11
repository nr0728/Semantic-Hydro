import { STATUS } from '@hydrooj/utils/lib/status';

const operation = /^(status|score)\((\d+)\) *(.*)$/;

export function parse(output: string, fullscore: number) {
    let status = STATUS.STATUS_WRONG_ANSWER;
    let score = 0;
    let builder = (msg: string) => msg;
    let message = output.substring(0, 1024);
    if (output.startsWith('ok ')) {
        status = STATUS.STATUS_ACCEPTED;
        score = fullscore;
    } else if (output.startsWith('wrong answer ')) {
        message = output.split('wrong answer ')[1] || '';
    } else if (output.startsWith('wrong output format ')) {
        message = output.split('wrong output format ')[1] || '';
        builder = (msg) => `PE ${msg}`;
    } else if (output.startsWith('partially correct ')) {
        let p = +output.split('partially correct (')[1].split(')')[0] || 0;
        if (p > 1) p /= 100;
        score = Math.floor(fullscore * p);
        const res = message.split(')');
        res.shift();
        message = res.join(')').trim();
        builder = (msg) => `PC ${msg}`;
    } else if (output.startsWith('points ')) {
        let p = +output.split('points ')[1].split(' ')[0] || 0;
        if (p > 1) p /= 100;
        if (p === 1) {
            status = STATUS.STATUS_ACCEPTED;
            score = fullscore;
            const base = output.split('points ')[1] || '';
            message = base.substring(base.indexOf(' '), 1024);
        } else score = Math.floor(fullscore * p);
    }
    while (operation.test(message)) {
        const [, op, val, rest] = message.match(operation);
        if (op === 'status') {
            status = +val;
            message = rest;
        } else if (op === 'score') {
            score = +val;
            message = rest;
        }
    }
    return { status, score, message: builder(message) };
}
