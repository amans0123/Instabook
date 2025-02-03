#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

string findBestSubstring(string text, string prefixString, string suffixString) {
    int textLen = text.length();
    int prefixLen = prefixString.length();
    int suffixLen = suffixString.length();
    
    int maxTextScore = 0;
    string bestSubstring = text;
    
    // Array to store the maximum prefix score for each position in text
    vector<int> prefixScores(textLen + 1, 0);
    
    // Calculate the prefix scores
    for (int i = 0; i < textLen; ++i) {
        int matchLength = 0;
        for (int j = 0; j <= i && j < prefixLen; ++j) {
            if (text[i - j] == prefixString[prefixLen - j - 1]) {
                ++matchLength;
            } else {
                break;
            }
        }
        prefixScores[i + 1] = matchLength;
    }
    
    // Calculate the suffix scores and find the best matching substring
    for (int i = 0; i < textLen; ++i) {
        int suffixScore = 0;
        int matchLength = 0;
        for (int j = 0; j < textLen - i && j < suffixLen; ++j) {
            if (text[i + j] == suffixString[j]) {
                ++matchLength;
            } else {
                break;
            }
        }
        suffixScore = matchLength;
        
        int textScore = prefixScores[i] + suffixScore;
        string candidateSubstring = text.substr(i - prefixScores[i], prefixScores[i] + suffixScore);

        if (textScore > maxTextScore || 
            (textScore == maxTextScore && candidateSubstring < bestSubstring)) {
            maxTextScore = textScore;
            bestSubstring = candidateSubstring;
        }
    }

    return bestSubstring;
}

int main() {
    string text = "engine";
    string prefixString = "raven";
    string suffixString = "ginko";
    
    string result = findBestSubstring(text, prefixString, suffixString);
    cout << "Best Substring: " << result << endl;

    return 0;
}
