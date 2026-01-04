import java.util.*;

class firstRepeat {

    public char firstRepeat(String s) {
        HashSet<Character> set = new HashSet<>();
        for (char ch : s.toCharArray()) {
            if (set.contains(ch)) {
                return ch;
            } else {
                set.add(ch);
            }
        }
        return '\0'; // Return null character if no repeating character is found
    }

    public static void main(String[] args) {
        String s = "geeksforgeeks";
        firstRepeat obj = new firstRepeat();
        char res = obj.firstRepeat(s);
        System.out.println("First repeating character is: " + res);
    }
}
