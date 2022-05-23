import moment from "moment";

export default function time(timestamp) {
    return moment(timestamp).startOf("minute").fromNow();
}