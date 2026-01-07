public boolean hasCycle(listNode head) {
    listNode slow = head;
    listNode fast = head;
    while (slow.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            return true;
        }
    }
    return false;
}
