import java.util.*;

class reverseString {

    public String reverseString(String s) {
        int e = s.length() - 1;
        StringBuilder str = new StringBuilder();
        while (e >= 0) {
            str.append(s.charAt(e));
            e--;
        }
        return str.toString();
    }

    public static void main(String[] args) {
        String s = "faizan_test";
        reverseString rs = new reverseString();
        System.out.println("reverse of: " + s + " is " + rs.reverseString(s));
    }
}
