import { operate } from '../util/lift';
import { noop } from '../util/noop';
import { OperatorSubscriber } from './OperatorSubscriber';
export function sample(notifier) {
    return operate((source, subscriber) => {
        let hasValue = false;
        let lastValue = null;
        source.subscribe(new OperatorSubscriber(subscriber, (value) => {
            hasValue = true;
            lastValue = value;
        }));
        notifier.subscribe(new OperatorSubscriber(subscriber, () => {
            if (hasValue) {
                hasValue = false;
                const value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        }, noop));
    });
}
//# sourceMappingURL=sample.js.map