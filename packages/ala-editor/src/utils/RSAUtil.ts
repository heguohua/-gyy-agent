/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-07 22:39:37
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-07 22:39:41
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/RSAUtil.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { createVerify, createHash } from 'crypto';

class RSAUtil {
    
    private publicKey: string;

    constructor(publicKey: string) {
        this.publicKey = publicKey;
    }

    /**
     * 签名表单参数
     * @param data 需要签名的数据
     * @param encoding 签名的编码方式，默认为 'base64'
     */
    sign(data: object, encoding: string = 'base64'): string {
        const stringifyData = JSON.stringify(data);
        const hash = createHash('sha256').update(stringifyData).digest('hex');
        const verifier = createVerify('RSA-SHA256');
        verifier.update(hash);
        const signature = verifier.sign({
            key: this.publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING
        }, 'utf8');
        return signature.toString(encoding);
    }

    /**
     * 验证签名是否有效
     * @param data 需要验证的数据
     * @param signature 签名
     * @param encoding 签名的编码方式，默认为 'base64'
     */
    verify(data: object, signature: string, encoding: string = 'base64'): boolean {
        const stringifyData = JSON.stringify(data);
        const hash = createHash('sha256').update(stringifyData).digest('hex');
        const verifier = createVerify('RSA-SHA256');
        verifier.update(hash);
        return verifier.verify({
            key: this.publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING
        }, Buffer.from(signature, encoding), 'utf8');
    }
}

// 使用示例
const publicKey = `-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----`; // 这里应该是你的公钥

const rsaUtil = new RSAUtil(publicKey);

// 签名数据
const formData = { username: 'user1', password: 'password123' };
const signature = rsaUtil.sign(formData);
console.log('Signature:', signature);

// 验证签名
const isVerified = rsaUtil.verify(formData, signature);
console.log('Is Verified:', isVerified);