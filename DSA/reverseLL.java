import java.util.*;

class reverseLL {

    public listNode reverseList(listNode head) {
        if (head == null || head.next == null) return head;

        listNode prev = null;
        listNode curr = head;

        while (curr != null) {
            listNode temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }
    }
}
